import {Observable, of} from 'rxjs';
import {IAdsbexTrafficService} from './i-adsbex-traffic-service';
import {TrafficAdsbex} from '../../domain/traffic-adsbex';
import {TrafficState} from '../../domain/traffic-state';
import {IDate} from '../../../shared/services/date/i-date';
import {TrafficMap} from '../../domain/traffic-map';
import {AdsbexTrafficMerger} from './adsbex-traffic-merger';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';


export class AdsbexTrafficReader {
    private adsbexTrafficMerger: AdsbexTrafficMerger;


    public constructor(
        private readonly adsbexTrafficService: IAdsbexTrafficService,
        private readonly trafficState$: Observable<TrafficState>,
        private readonly date: IDate
    ) {
        this.adsbexTrafficMerger = new AdsbexTrafficMerger(this.date);
    }


    public read(): Observable<TrafficMap> {
        return of(1).pipe(
            withLatestFrom(this.trafficState$),
            switchMap(([dummy, state]) => this.readTraffic(state)),
            withLatestFrom(this.trafficState$),
            map(([ognTraffic, state]) => this.mergeTraffic(state, ognTraffic))
        );
    }


    private readTraffic(state: TrafficState): Observable<TrafficAdsbex[]> {
        return this.adsbexTrafficService.readTraffic(state.extent);
    }


    private mergeTraffic(state: TrafficState, adsbexTraffic: TrafficAdsbex[]): TrafficMap {
        return this.adsbexTrafficMerger.merge(state, adsbexTraffic);
    }
}
