import { Observable, of } from 'rxjs';
import { WsMessage } from './ws-message.interface';
import { ConnectionParams } from '../../../../model/types/connection-params.type';

export interface DataApiService {
  connect: () => void;
  onmessage: () => Observable<WsMessage>;
  send: (connectionParams: ConnectionParams) => void;
  disconnect: () => void;
}
