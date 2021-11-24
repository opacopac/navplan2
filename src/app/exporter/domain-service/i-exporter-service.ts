import {Observable} from 'rxjs';
import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {Track} from '../../track/domain-model/track';


export abstract class IExporterService {
    public abstract exportPdf(flightroute: Flightroute): Observable<string>;

    public abstract exportKml(flightroute: Flightroute, track: Track): Observable<string>;
}
