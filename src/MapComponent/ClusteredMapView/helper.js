export function getColorForRange(range) {
  // Ensure the range is between 0 and 100
  range = Math.min(100, Math.max(0, range));

  // Calculate the lightness value based on the range (direct mapping)
  const lightness = 50 - (range / 100) * 25;

  // Convert HSL color to RGB
  const rgbColor = hslToRgb(120, 100, lightness);

  // Format the RGB color
  const formattedColor = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;

  return formattedColor;
}

// Function to convert HSL color to RGB color
function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
