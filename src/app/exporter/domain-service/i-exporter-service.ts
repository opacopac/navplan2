import {Observable} from 'rxjs';
import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {Track} from '../../track/domain-model/track';
import {ExportedFile} from '../domain-model/exported-file';


export abstract class IExporterService {
    public abstract exportPdf(flightroute: Flightroute): Observable<ExportedFile>;

    public abstract exportKml(flightroute: Flightroute, track: Track): Observable<ExportedFile>;
}
