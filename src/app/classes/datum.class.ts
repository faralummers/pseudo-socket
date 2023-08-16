import { DatumDto } from '../modules/data-presentation/model/interfaces/datum-dto.interface';
import { Color, colorCreator } from './color';

export class Datum {
  /** The datum id */
  id: string;
  /** A integer */
  int: number;
  /** A float */
  float: number;
  /** The bridge to datum color */
  color: Color;
  /** The child entity of the datum */
  child: { id: Datum['id']; color: Datum['color'] };

  constructor(dtoValue: DatumDto) {
    this.id = dtoValue.id;
    this.int = dtoValue.int;
    this.float = dtoValue.float;
    /** To make it run faster change Color class to string */
    this.color = colorCreator(dtoValue.color);
    this.child = { id: dtoValue.child.id, color: colorCreator(dtoValue.child.color)};
  }
}
