import { Color } from './color.class';

export type RgbColorType = string;

/** The color class in rgb format */
export class RgbColor extends Color {
  constructor(value: RgbColorType) {
    super(value);
  }

  getHexString(): string {
    const hexValue = this.initialValue
      .replace(/[^\d,]/g, '')
      .split(',')
      .map(colorItem => parseInt(colorItem, 16))
      .join();

    return `#${hexValue}`;
  }

  /** Checks if it is a color in rgb format */
  static isRgb(color: string): color is RgbColorType {
    return color.search((/rgba?\(.+?\)/gm)) > 0;
  }
}

