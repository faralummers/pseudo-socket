import { Injectable } from '@angular/core';

enum colorTypes {
  'rgb',
  'hex',
  'string'
}

/** The data builder */
@Injectable({
  providedIn: 'root'
})
export class DataBuilderService {
  /** Gives a random number */
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /** Gives a random float */
  getRandomFloat(min: number, max: number, precision: number = 18): number {
    return parseFloat(
      (Math.random() * (max - min + 1) + min).toFixed(precision)
    );
  }

  /** Gives a random string */
  getRandomString(length: number): string {
      const characters ='abcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';

      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      return result;
  }

  /** Gives a random color */
  getRandomColor(): string {
      const randomColorType: keyof typeof colorTypes = colorTypes[this.getRandomNumber(0, 2)] as keyof typeof colorTypes;
      const colorGetters: Record<keyof typeof colorTypes, () => string> = {
        rgb: this.getRandomRgbColor,
        hex: this.getRandomHexColor,
        string: this.getRandomStringColor
      }
      const color = colorGetters[randomColorType].bind(this)();

      return color;
  }

  /** Gives a random color in the rgb format */
  private getRandomRgbColor(): string {
    const randomRed = this.getRandomNumber(0, 255);
    const randomGreen = this.getRandomNumber(0, 255);
    const randomBlue = this.getRandomNumber(0, 255);

    return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`
  }

  /** Gives a random color in the hex format */
  private getRandomHexColor(): string {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`
  }

  /** Gives a random color in the string format */
  private getRandomStringColor(): string {
    const colors = ["Blue ", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow "];
    const randomColorIndex = this.getRandomNumber(0, colors.length - 1);

    return colors[randomColorIndex];
  }
}
