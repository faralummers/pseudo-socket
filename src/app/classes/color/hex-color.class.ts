import { Color } from './color.class';

export type HexColorType = string;

/** The color class in hex format */
export class HexColor extends Color {
  constructor(value: HexColorType) {
    super(value);
  }

  getHexString(): string {
    return this.initialValue;
  }

  /** Checks if it is a color in hex format */
  static isHex(color: string): color is HexColorType {
    const correctLength = color.length === 4 || color.length === 7;

    return correctLength
      && color.search(/#([a-f0-9]{6}|[a-f0-9]{3})\b/) > 0
  }
}
