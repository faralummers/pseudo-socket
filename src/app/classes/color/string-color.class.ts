import { Color } from './color.class';
import stc from 'string-to-color';

export type StringColorType = string;

export class StringColor extends Color {
  constructor(value: StringColorType) {
    super(value);
  }

  getHexString(): string {
    return stc(this.initialValue);
  }
}
