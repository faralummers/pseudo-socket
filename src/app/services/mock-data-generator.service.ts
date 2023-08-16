import { Injectable } from '@angular/core';
import { DatumDto } from '../modules/data-presentation/model/interfaces/datum-dto.interface';
import { DataBuilderService } from './data-builder.service';

@Injectable({
  providedIn: 'root',
})
export class MockDataGeneratorService {
  constructor(
    private readonly builder: DataBuilderService
  ) {}

  /** Gives randomly generated data */
  generateData(size: number): DatumDto[] {
    const result: DatumDto[] = [];

    for (let i = 0; i < size; i++) {
      if (i > 100) {
        const pseudoUniqDatum = result[i % 100];
        result.push(pseudoUniqDatum);
        continue;
      }

      result.push(this.generateDatumDto());
    }

    return result;
  }

  private generateDatumDto(): DatumDto {
    return {
      id: this.builder.getRandomString(10),
      int: this.builder.getRandomNumber(0, 100),
      float: this.builder.getRandomFloat(0, 2, 18),
      color: this.builder.getRandomColor(),
      child: {
        id: this.builder.getRandomString(10),
        color: this.builder.getRandomColor()
      }
    }
  }
}
