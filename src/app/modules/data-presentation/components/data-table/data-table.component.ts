import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Datum } from '../../../../classes/datum.class';
import { Color } from '../../../../classes/color';

/** The component to presentation data in the table format */
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  @Input()
  rows: Datum[] = [];

  trackByFn(index: number, row: Datum): string {
    return row.id;
  }

  getStylesForColorCell(color: Color): Record<string, string> {
    return {
      color: color.rgbString,
      background: Color.rgba(color.rgb, 0.5)
    }
  }
}
