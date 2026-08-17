#!/usr/bin/env node

import { readFileSync } from 'node:fs';

const homeCssPath = 'src/app/home.css';
const sharedCssPath = 'src/app/site.css';
const errors = [];

const homeCss = readFileSync(homeCssPath, 'utf8');
const sharedCss = readFileSync(sharedCssPath, 'utf8');
const tokenStart = '/* homepage-token-start */';
const tokenEnd = '/* homepage-token-end */';
const tokenStartIndex = homeCss.indexOf(tokenStart);
const tokenEndIndex = homeCss.indexOf(tokenEnd);

if (tokenStartIndex === -1 || tokenEndIndex === -1 || tokenEndIndex <= tokenStartIndex) {
  errors.push(`${homeCssPath} is missing its bounded homepage token block`);
}

const implementationCss =
  tokenStartIndex !== -1 && tokenEndIndex !== -1
    ? `${homeCss.slice(0, tokenStartIndex)}${homeCss.slice(tokenEndIndex + tokenEnd.length)}`
    : homeCss;

const rawColors = implementationCss.match(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g) ?? [];
if (rawColors.length) {
  errors.push(`Raw homepage colors remain: ${[...new Set(rawColors)].join(', ')}`);
}

const spacingProperties =
  /^(?:margin(?:-[\w-]+)?|padding(?:-[\w-]+)?|gap|row-gap|column-gap|inset(?:-[\w-]+)?|top|right|bottom|left|outline-offset|text-underline-offset)$/;
const tokenizedTypographyProperties = /^(?:font|font-size|font-weight|line-height|letter-spacing)$/;

for (const match of implementationCss.matchAll(/^\s*([\w-]+)\s*:\s*([^;]+);/gm)) {
  const [, property, value] = match;

  if (spacingProperties.test(property) && /\d(?:\.\d+)?(?:px|em|rem)\b/.test(value)) {
    errors.push(`Untokenized homepage spacing: ${property}: ${value.trim()}`);
  }

  if (
    tokenizedTypographyProperties.test(property) &&
    value !== 'inherit' &&
    !value.includes('var(')
  ) {
    errors.push(`Untokenized homepage typography: ${property}: ${value.trim()}`);
  }

  if (property === 'border-radius' && !value.includes('var(')) {
    errors.push(`Untokenized homepage radius: ${value.trim()}`);
  }
}

if (sharedCss.includes('.home-site')) {
  errors.push(`${sharedCssPath} still contains homepage selectors`);
}

const declaredTokens = [...homeCss.matchAll(/^\s*(--home-[\w-]+)\s*:/gm)].map((match) => match[1]);
const duplicateTokens = declaredTokens.filter(
  (token, index) => declaredTokens.indexOf(token) !== index
);
if (duplicateTokens.length) {
  errors.push(`Duplicate homepage tokens: ${[...new Set(duplicateTokens)].join(', ')}`);
}

const unusedTokens = declaredTokens.filter((token) => !implementationCss.includes(`var(${token})`));
if (unusedTokens.length) {
  errors.push(`Unused homepage tokens: ${unusedTokens.join(', ')}`);
}

if (errors.length) {
  console.error(
    `Homepage token contract failed:\n${errors.map((error) => `- ${error}`).join('\n')}`
  );
  process.exit(1);
}

console.log(
  `Homepage token contract passed: ${declaredTokens.length} tokens, no raw color/type/spacing/radius values.`
);
