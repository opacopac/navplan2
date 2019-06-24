import {IOgnTrafficService} from './i-ogn-traffic-service';
import {Observable, of} from 'rxjs';
import {TrafficState} from '../../domain/traffic-state';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {OgnTrafficMerger} from './ogn-traffic-merger';
import {TrafficOgn} from '../../domain/traffic-ogn';
import {TrafficMap} from '../../domain/traffic-map';
import {IDate} from '../../../shared/services/date/i-date';


export class OgnTrafficReader {
    private ognTrafficMerger: OgnTrafficMerger;

    public constructor(
        private readonly ognTrafficService: IOgnTrafficService,
        private readonly trafficState$: Observable<TrafficState>,
        private readonly date: IDate
    ) {
        this.ognTrafficMerger = new OgnTrafficMerger(this.date);
    }


    public read(): Observable<TrafficMap> {
        return of(1).pipe(
            withLatestFrom(this.trafficState$),
            switchMap(([dummy, state]) => this.readTraffic(state)),
            withLatestFrom(this.trafficState$),
            map(([ognTraffic, state]) => this.mergeTraffic(state, ognTraffic))
        );
    }


    private readTraffic(state: TrafficState): Observable<TrafficOgn[]> {
        return this.ognTrafficService.readTraffic(
            state.extent,
            state.maxTrafficAgeSec,
            0,
            state.sessionId
        );
    }


    private mergeTraffic(state: TrafficState, ognTraffic: TrafficOgn[]): TrafficMap {
        return this.ognTrafficMerger.merge(state, ognTraffic);
    }
}
