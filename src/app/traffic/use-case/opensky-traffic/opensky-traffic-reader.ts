import {Observable, of} from 'rxjs';
import {IOpenskyTrafficService} from './i-opensky-traffic-service';
import {TrafficOpensky} from '../../domain/traffic-opensky';
import {TrafficState} from '../../domain/traffic-state';
import {IDate} from '../../../shared/services/date/i-date';
import {TrafficMap} from '../../domain/traffic-map';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {OpenskyTrafficMerger} from './opensky-traffic-merger';


export class OpenskyTrafficReader {
    private openskyTrafficMerger: OpenskyTrafficMerger;


    public constructor(
        private readonly openskyTrafficService: IOpenskyTrafficService,
        private readonly trafficState$: Observable<TrafficState>,
        private readonly date: IDate
    ) {
        this.openskyTrafficMerger = new OpenskyTrafficMerger(date);
    }


    public read(): Observable<TrafficMap> {
        return of(1).pipe(
            withLatestFrom(this.trafficState$),
            switchMap(([dummy, state]) => this.readTraffic(state)),
            withLatestFrom(this.trafficState$),
            map(([ognTraffic, state]) => this.mergeTraffic(state, ognTraffic))
        );
    }


    private readTraffic(state: TrafficState): Observable<TrafficOpensky[]> {
        return this.openskyTrafficService.readTraffic(state.extent);
    }


    private mergeTraffic(state: TrafficState, openskyTraffic: TrafficOpensky[]): TrafficMap {
        return this.openskyTrafficMerger.merge(state, openskyTraffic);
    }
}
