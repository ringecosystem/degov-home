const VIEWBOX_WIDTH = 1800;
const VIEWBOX_HEIGHT = 1360;

const MESH_CENTER_X = VIEWBOX_WIDTH / 2;
const MESH_CENTER_Y = 640;
const MESH_RADIUS = 560;
const MESH_TOP_Y = MESH_CENTER_Y - MESH_RADIUS;
const MESH_BOTTOM_Y = MESH_CENTER_Y + MESH_RADIUS;
const MESH_ROW_COUNT = 24;
const DOT_GAP = 16;
const MESH_CENTER_RATIO = MESH_CENTER_Y / VIEWBOX_HEIGHT;

const meshRows = Array.from({ length: MESH_ROW_COUNT }, (_, rowIndex) => {
  const rowProgress = rowIndex / (MESH_ROW_COUNT - 1);
  const easedRow = Math.pow(rowProgress, 1.12);
  const y = MESH_TOP_Y + easedRow * (MESH_BOTTOM_Y - MESH_TOP_Y);
  const normalizedY = (y - MESH_CENTER_Y) / MESH_RADIUS;
  const halfWidth = MESH_RADIUS * Math.sqrt(Math.max(0, 1 - normalizedY * normalizedY));
  const stagger = rowIndex % 2 === 0 ? 0 : DOT_GAP / 2;
  const offsets: number[] = [];

  if (stagger === 0) {
    offsets.push(0);
  }

  for (let distance = stagger || DOT_GAP / 2; distance < halfWidth; distance += DOT_GAP) {
    offsets.push(-distance, distance);
  }

  const dots = offsets
    .sort((a, b) => a - b)
    .map((offset, dotIndex) => {
      const x = MESH_CENTER_X + offset;
      const centerWeight = 1 - Math.min(1, Math.abs(offset) / Math.max(halfWidth, 1));
      const opacity = 0.03 + centerWeight * 0.1 + rowProgress * 0.05;
      const size = 0.9 + rowProgress * 0.55;
      const verticalBend = centerWeight * (1 - rowProgress) * 8;

      return {
        key: `dot-${rowIndex}-${dotIndex}`,
        x,
        y: y + verticalBend,
        opacity,
        size
      };
    });

  return {
    key: `row-${rowIndex}`,
    dots
  };
});

const GUIDE_LINE_OFFSETS = [-43.8, -29.2, -14.6, 0, 14.6, 29.2, 43.8];

const guideLines = GUIDE_LINE_OFFSETS.map((offset, index) => ({
  key: `guide-${index}`,
  left: `${50 + offset}%`
}));

export function HeroGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_38%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(189,143,86,0.07),transparent_30%)]" />

      <div className="absolute inset-0">
        {guideLines.map((line) => (
          <div
            key={line.key}
            className="absolute top-0 bottom-0 w-px bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.1)_0_5px,transparent_5px_11px)] opacity-55"
            style={{ left: line.left }}
          />
        ))}
      </div>

      <div className="absolute top-[43vh] right-0 left-0 h-px bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.07)_0_7px,transparent_7px_14px)] opacity-65" />

      <svg
        className="absolute left-1/2 top-1/2 h-[96vh] w-[min(1900px,118vw)] opacity-80"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ transform: `translate(-50%, -${MESH_CENTER_RATIO * 100}%)` }}
      >
        <defs>
          <radialGradient id="mesh-glow" cx="50%" cy="10%" r="70%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="52%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <linearGradient id="mesh-mask" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" />
            <stop offset="72%" stopColor="rgba(255,255,255,0.92)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <mask id="mesh-fade">
            <rect width="100%" height="100%" fill="url(#mesh-mask)" />
          </mask>
        </defs>

        <ellipse
          cx={MESH_CENTER_X}
          cy={MESH_CENTER_Y}
          rx={MESH_RADIUS * 0.96}
          ry={MESH_RADIUS * 0.96}
          fill="url(#mesh-glow)"
          opacity="0.34"
        />

        <g mask="url(#mesh-fade)">
          {meshRows.map((row) =>
            row.dots.map((dot) => (
              <rect
                key={dot.key}
                x={dot.x - dot.size / 2}
                y={dot.y - dot.size / 2}
                width={dot.size}
                height={dot.size}
                rx="0.16"
                fill={`rgba(255,255,255,${dot.opacity})`}
              />
            ))
          )}
        </g>
      </svg>

      <div className="absolute inset-x-0 top-0 h-[16vh] bg-[linear-gradient(to_bottom,rgba(5,5,5,0.82),transparent)]" />
      <div className="absolute inset-x-0 top-[45vh] h-[28vh] bg-[linear-gradient(to_bottom,transparent,rgba(5,5,5,0.74))]" />
      <div className="absolute inset-x-0 bottom-0 h-[18vh] bg-[linear-gradient(to_top,rgba(5,5,5,0.96),transparent)]" />
    </div>
  );
}
