// This script generates favicon files for the password generator app
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create directory if it doesn't exist
const iconsDir = path.join(__dirname, '../icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Helper function to draw a lock with password pattern
function drawPasswordIcon(ctx, size) {
  // Set background
  ctx.fillStyle = '#2b6cb0'; // Primary blue color
  ctx.fillRect(0, 0, size, size);
  
  // Calculate proportions based on size
  const padding = size * 0.15;
  const lockWidth = size - (padding * 2);
  const lockHeight = lockWidth * 0.8;
  const lockX = padding;
  const lockY = padding + (size - padding * 2 - lockHeight) / 2;
  
  // Draw lock body
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(lockX, lockY + lockHeight * 0.3, lockWidth, lockHeight * 0.7, size * 0.1);
  ctx.fill();
  
  // Draw lock shackle
  ctx.beginPath();
  ctx.lineWidth = size * 0.08;
  ctx.strokeStyle = '#ffffff';
  const shackleX = lockX + lockWidth * 0.25;
  const shackleWidth = lockWidth * 0.5;
  const shackleHeight = lockHeight * 0.45;
  ctx.moveTo(shackleX, lockY + lockHeight * 0.3);
  ctx.lineTo(shackleX, lockY);
  ctx.lineTo(shackleX + shackleWidth, lockY);
  ctx.lineTo(shackleX + shackleWidth, lockY + lockHeight * 0.3);
  ctx.stroke();
  
  // Draw password dots/stars pattern
  ctx.fillStyle = '#2b6cb0';
  const dotsStartY = lockY + lockHeight * 0.45;
  const dotSpacing = lockHeight * 0.15;
  
  // Draw asterisk characters to represent password
  ctx.font = `bold ${Math.round(size * 0.12)}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const symbols = ['*', '*', '*', '*'];
  symbols.forEach((symbol, i) => {
    ctx.fillText(symbol, lockX + lockWidth / 2, dotsStartY + i * dotSpacing);
  });
}

// Generate 16x16 favicon
const canvas16 = createCanvas(16, 16);
const ctx16 = canvas16.getContext('2d');
drawPasswordIcon(ctx16, 16);
fs.writeFileSync(path.join(iconsDir, 'favicon-16x16.png'), canvas16.toBuffer());

// Generate 32x32 favicon
const canvas32 = createCanvas(32, 32);
const ctx32 = canvas32.getContext('2d');
drawPasswordIcon(ctx32, 32);
fs.writeFileSync(path.join(iconsDir, 'favicon-32x32.png'), canvas32.toBuffer());

// Generate 192x192 favicon for Android
const canvas192 = createCanvas(192, 192);
const ctx192 = canvas192.getContext('2d');
drawPasswordIcon(ctx192, 192);
fs.writeFileSync(path.join(iconsDir, 'android-chrome-192x192.png'), canvas192.toBuffer());

// Generate 512x512 favicon for Android
const canvas512 = createCanvas(512, 512);
const ctx512 = canvas512.getContext('2d');
drawPasswordIcon(ctx512, 512);
fs.writeFileSync(path.join(iconsDir, 'android-chrome-512x512.png'), canvas512.toBuffer());

// Generate iOS icon
const canvasApple = createCanvas(180, 180);
const ctxApple = canvasApple.getContext('2d');
drawPasswordIcon(ctxApple, 180);
fs.writeFileSync(path.join(iconsDir, 'apple-touch-icon.png'), canvasApple.toBuffer());

console.log('Favicon files generated successfully!');