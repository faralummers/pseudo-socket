import { Injectable } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { WsMessage } from '../model/interfaces/ws-message.interface';
import { ConnectionParams } from '../../../model/types/connection-params.type';
import { MockDataGeneratorService } from '../../../services/mock-data-generator.service';
import { DataApiService } from '../model/interfaces/data-api-service.interface';

@Injectable()
export class MockDataApiService implements DataApiService {
  private pseudoSocket = new Subject<WsMessage>();

  private wsConnectionClose = new Subject<void>();

  private connectionOptions: ConnectionParams = {
    timerInterval: 3000,
    dataArraySize: 10,
    additionalIds: []
  }

  private timer?: NodeJS.Timer;

  constructor(
    private readonly dataGeneratorService: MockDataGeneratorService,
  ) {
  }

  connect(): void {
    this.startGenerateData();
  }

  onmessage(): Observable<WsMessage> {
     return this.pseudoSocket.asObservable().pipe(
      takeUntil(this.wsConnectionClose)
    )
  }

  send(connectionParams: Partial<ConnectionParams>): void {
    this.connectionOptions = { ...this.connectionOptions, ...connectionParams }
  }

  disconnect(): void {
    this.wsConnectionClose.next();
    clearTimeout(this.timer);
  }

  private startGenerateData(): void {
    this.timer = setTimeout(
      () => {
        this.pseudoSocket.next({
          data: {
            records: this.dataGeneratorService.generateData(this.connectionOptions.dataArraySize),
            trackedRecords: this.dataGeneratorService.generateData(this.connectionOptions.additionalIds.length)
              .map((datum, index) => ({ ...datum, id: this.connectionOptions.additionalIds[index] }))
          },
          status: 'success'
        });

        this.startGenerateData();
      },
      this.connectionOptions.timerInterval
    )
  }
}
