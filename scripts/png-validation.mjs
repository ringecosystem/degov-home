import { readFileSync } from 'node:fs';
import { crc32, inflateSync } from 'node:zlib';

const PNG_SIGNATURE = '89504e470d0a1a0a';

// Validate the entire PNG stream instead of trusting only the signature and
// IHDR fields. This catches truncated IDAT data, corrupt CRCs, missing IEND,
// invalid zlib payloads, and malformed scanline filters.
export function validateRgbPng(path, expectedWidth, expectedHeight) {
  const png = readFileSync(path);
  if (png.subarray(0, 8).toString('hex') !== PNG_SIGNATURE) {
    throw new Error(`${path} does not have a valid PNG signature`);
  }

  let offset = 8;
  let ihdr;
  let sawIend = false;
  let chunkIndex = 0;
  let idatState = 'before';
  let sawPlte = false;
  const idatChunks = [];

  while (offset < png.length) {
    if (offset + 12 > png.length) {
      throw new Error(`${path} ends inside a PNG chunk header`);
    }

    const length = png.readUInt32BE(offset);
    const typeStart = offset + 4;
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    const chunkEnd = dataEnd + 4;
    if (chunkEnd > png.length) {
      throw new Error(`${path} ends inside a PNG chunk payload`);
    }

    const typeBytes = png.subarray(typeStart, dataStart);
    const type = typeBytes.toString('ascii');
    const data = png.subarray(dataStart, dataEnd);
    const expectedCrc = png.readUInt32BE(dataEnd);
    const actualCrc = crc32(Buffer.concat([typeBytes, data])) >>> 0;
    if (actualCrc !== expectedCrc) {
      throw new Error(`${path} has an invalid ${type} chunk CRC`);
    }

    if (chunkIndex === 0 && type !== 'IHDR') {
      throw new Error(`${path} must begin with IHDR`);
    }
    if (!['IHDR', 'PLTE', 'IDAT', 'IEND'].includes(type) && (typeBytes[0] & 0x20) === 0) {
      throw new Error(`${path} contains unknown critical chunk ${type}`);
    }
    if (type === 'IDAT') {
      if (idatState === 'ended') throw new Error(`${path} has non-consecutive IDAT chunks`);
      idatState = 'active';
    } else if (idatState === 'active') {
      idatState = 'ended';
    }

    if (type === 'IHDR') {
      if (ihdr || length !== 13) throw new Error(`${path} has an invalid IHDR chunk`);
      ihdr = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        bitDepth: data[8],
        colorType: data[9],
        compression: data[10],
        filter: data[11],
        interlace: data[12]
      };
    } else if (type === 'PLTE') {
      if (sawPlte || idatState !== 'before' || length === 0 || length > 768 || length % 3 !== 0) {
        throw new Error(`${path} has an invalid PLTE chunk`);
      }
      sawPlte = true;
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    } else if (type === 'IEND') {
      if (length !== 0) throw new Error(`${path} has an invalid IEND chunk`);
      sawIend = true;
      offset = chunkEnd;
      break;
    }

    offset = chunkEnd;
    chunkIndex += 1;
  }

  if (!ihdr) throw new Error(`${path} is missing IHDR`);
  if (!sawIend) throw new Error(`${path} is missing IEND`);
  if (offset !== png.length) throw new Error(`${path} has trailing data after IEND`);
  if (!idatChunks.length) throw new Error(`${path} is missing IDAT data`);
  if (ihdr.width !== expectedWidth || ihdr.height !== expectedHeight) {
    throw new Error(
      `${path} must be ${expectedWidth}x${expectedHeight}, received ${ihdr.width}x${ihdr.height}`
    );
  }
  if (
    ihdr.bitDepth !== 8 ||
    ihdr.colorType !== 2 ||
    ihdr.compression !== 0 ||
    ihdr.filter !== 0 ||
    ihdr.interlace !== 0
  ) {
    throw new Error(`${path} must be a non-interlaced 8-bit RGB PNG`);
  }

  let scanlines;
  try {
    scanlines = inflateSync(Buffer.concat(idatChunks));
  } catch (error) {
    throw new Error(`${path} has invalid compressed image data: ${error.message}`);
  }

  const rowBytes = ihdr.width * 3;
  const expectedScanlineBytes = ihdr.height * (rowBytes + 1);
  if (scanlines.length !== expectedScanlineBytes) {
    throw new Error(
      `${path} has ${scanlines.length} decoded bytes, expected ${expectedScanlineBytes}`
    );
  }
  for (let row = 0; row < ihdr.height; row += 1) {
    const filterType = scanlines[row * (rowBytes + 1)];
    if (filterType > 4) throw new Error(`${path} row ${row} has invalid filter ${filterType}`);
  }

  return png;
}
