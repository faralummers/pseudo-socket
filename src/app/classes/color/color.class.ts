/** The color class */
export abstract class Color {
  initialValue: string;
  hexString: string;
  rgbString: string;
  rgb: [number, number, number];

  protected constructor(value: string) {
    this.initialValue = value;
    this.hexString = this.getHexString();
    this.rgbString = this.getRgbString();
    this.rgb = this.getRgb();
  }

  getRgbString(): string {
    const [red, green, blue] = this.getRgb();

    return `rgb(${red}, ${green}, ${blue})`;
  };

  getRgb(): [number, number, number] {
    const [red, green, blue] = this.getHexString()
      .replace(/#/, '')
      .match(/.{1,2}/g)
      ?.map(colorItem => parseInt(colorItem, 16)) ?? [0, 0, 0];

    return [red, green, blue];
  };

  abstract getHexString(): string;

  static rgba(rgb: [number, number, number], alpha: number ): string {
    if (alpha > 1) alpha = 1;

    const [red, green, blue] = rgb;

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`
  }
}
