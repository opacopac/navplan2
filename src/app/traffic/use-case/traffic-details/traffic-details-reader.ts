import {Observable, of} from 'rxjs';
import {Traffic} from '../../domain/traffic';
import {TrafficDetails} from '../../domain/traffic-details';
import {ITrafficDetailsService} from './i-traffic-details-service';
import {TrafficMap} from '../../domain/traffic-map';
import {TrafficState} from '../../domain/traffic-state';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {TrafficDetailsMerger} from './traffic-details-merger';


export class TrafficDetailsReader {
    public constructor(
        private readonly trafficDetailService: ITrafficDetailsService,
        private readonly trafficState$: Observable<TrafficState>
    ) {
    }


    public read(): Observable<TrafficMap> {
        return of(1).pipe(
            withLatestFrom(this.trafficState$),
            switchMap(([dummy, state]) => this.readTraffic(state)),
            withLatestFrom(this.trafficState$),
            map(([ognTraffic, state]) => this.mergeTraffic(state, ognTraffic))
        );
    }


    private readTraffic(state: TrafficState): Observable<TrafficDetails[]> {
        const acList = this.getMissingTrafficDetailsAcList(state.trafficMap);

        if (acList.length > 0) {
            return this.trafficDetailService.readDetails(acList);
        } else {
            return of([]);
        }
    }


    private getMissingTrafficDetailsAcList(trafficMap: TrafficMap): Traffic[] {
        const missingTrafficAcList: Traffic[] = [];

        if (trafficMap) {
            trafficMap.forEach(ac => {
                if (!ac.isDetailsLoaded) {
                    missingTrafficAcList.push(ac);
                }
            });
        }

        return missingTrafficAcList;
    }


    private mergeTraffic(state: TrafficState, trafficDetails: TrafficDetails[]): TrafficMap {
        return TrafficDetailsMerger.merge(state, trafficDetails);
    }
}
