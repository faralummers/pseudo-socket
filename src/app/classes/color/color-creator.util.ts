import { Color } from './color.class';
import { HexColor } from './hex-color.class';
import { RgbColor } from './rgb-color.class';
import { StringColor } from './string-color.class';

export function colorCreator(color: string): Color {
  if (HexColor.isHex(color)) return new HexColor(color);
  if (RgbColor.isRgb(color)) return new RgbColor(color);

  return new StringColor(color);
}
