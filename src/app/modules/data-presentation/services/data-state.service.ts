import { Injectable, OnDestroy } from '@angular/core';
import { catchError, map, of, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { Datum } from '../../../classes/datum.class';
import { MockDataApiService } from './mock-data-api.service';
import { ConnectionParams } from '../../../model/types/connection-params.type';
import { WsMessage } from '../model/interfaces/ws-message.interface';

@Injectable()
export class DataStateService implements OnDestroy {
  data$ = new ReplaySubject<Datum[]>(1);

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly dataApiService: MockDataApiService
  ) {
    this.dataApiService.connect();
    this.subscribeToMessages();
  }

  setOptions(options: Partial<ConnectionParams>): void {
    this.dataApiService.send(options);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToMessages(): void {
    this.dataApiService.onmessage()
      .pipe(
        map((message: WsMessage) => message.data),
        catchError(error => {
          console.error(error.message);
          return of({ records: [], trackedRecords: [] });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        const worker = new Worker(new URL('./app.worker', import.meta.url));

        worker.onmessage = ({ data }) => this.data$.next(data);

        worker.postMessage(data);
      })
  }
}
