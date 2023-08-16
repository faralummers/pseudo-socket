import { Datum } from '../../../classes/datum.class';
import { WsMessage } from '../model/interfaces/ws-message.interface';

addEventListener('message', (message: { data: WsMessage['data'] }) => {
  const records = message.data.records
    .splice(message.data.trackedRecords.length - 10);

  const result = [...message.data.trackedRecords, ...records]
    .map(datum => new Datum(datum));

  postMessage(result);
});
