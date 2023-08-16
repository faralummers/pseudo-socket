import { Component } from '@angular/core';
import { ConnectionParams } from './model/types/connection-params.type';
import { MockDataApiService } from './modules/data-presentation/services/mock-data-api.service';
import { Subject } from 'rxjs';
import { Datum } from './classes/datum.class';
import { DataStateService } from './modules/data-presentation/services/data-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataStateService, MockDataApiService]
})
export class AppComponent {
  data$: Subject<Datum[]>  = this.dataState.data$;

  constructor(
    private readonly dataState: DataStateService
  ) {}

  changeOptions(params: Partial<ConnectionParams>): void {
    this.dataState.setOptions(params);
  }
}

