import { DatumDto } from './datum-dto.interface';

/** The interface of a message from a WebSocket connection */
export interface WsMessage {
  data: {
    records: DatumDto[];
    trackedRecords: DatumDto[];
  };
  status: 'success' | 'error';
}
