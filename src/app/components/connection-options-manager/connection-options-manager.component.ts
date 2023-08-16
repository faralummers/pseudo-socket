import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConnectionParams } from '../../model/types/connection-params.type';

/** The component to select connection options */
@Component({
  selector: 'app-connection-options-manager',
  templateUrl: './connection-options-manager.component.html',
  styleUrls: ['./connection-options-manager.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectionOptionsManagerComponent {
  @Output()
  optionsChanged = new EventEmitter<Partial<ConnectionParams>>();

  dataArraySize: number = 10;

  timerIntervalSize: number = 3000;

  submitOptions(): void {
    this.optionsChanged.next({ dataArraySize: this.dataArraySize, timerInterval: this.timerIntervalSize });
  }
}
