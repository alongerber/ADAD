// Simple script to generate PWA icons
// Run with: node scripts/generate-icons.js

import { writeFileSync, readFileSync } from 'fs';
import { execSync } from 'child_process';

// Create simple PNG icons using ImageMagick or fallback to base64 placeholder
const sizes = [192, 512];

// Simple colored square with text as placeholder (base64 encoded tiny PNG)
// This creates a simple amber-colored icon

const createPlaceholderIcon = (size) => {
  // Create an SVG that matches our design
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e293b"/>
      <stop offset="100%" style="stop-color:#0f172a"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fbbf24"/>
      <stop offset="100%" style="stop-color:#f59e0b"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#bg)"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size * 0.35}" fill="none" stroke="url(#gold)" stroke-width="${size * 0.024}"/>
  <rect x="${size * 0.36}" y="${size * 0.43}" width="${size * 0.28}" height="${size * 0.24}" rx="${size * 0.03}" fill="url(#gold)"/>
  <path d="M ${size * 0.41} ${size * 0.43} L ${size * 0.41} ${size * 0.35} A ${size * 0.09} ${size * 0.09} 0 0 1 ${size * 0.59} ${size * 0.35} L ${size * 0.59} ${size * 0.43}"
        fill="none" stroke="url(#gold)" stroke-width="${size * 0.04}" stroke-linecap="round"/>
  <circle cx="${size/2}" cy="${size * 0.53}" r="${size * 0.035}" fill="#1e293b"/>
  <rect x="${size * 0.485}" y="${size * 0.54}" width="${size * 0.03}" height="${size * 0.07}" rx="${size * 0.008}" fill="#1e293b"/>
</svg>`;
  return svg;
};

sizes.forEach(size => {
  const svg = createPlaceholderIcon(size);
  const filename = `public/icon-${size}.svg`;
  writeFileSync(filename, svg);
  console.log(`Created ${filename}`);

  // Try to convert to PNG using ImageMagick if available
  try {
    execSync(`convert -background none -resize ${size}x${size} ${filename} public/icon-${size}.png`, { stdio: 'inherit' });
    console.log(`Converted to icon-${size}.png`);
  } catch (e) {
    console.log(`Note: Install ImageMagick to convert SVG to PNG: sudo apt-get install imagemagick`);
    // Copy SVG as fallback
  }
});

console.log('Done! Icons created in public/ folder');
