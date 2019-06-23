import {Observable, of} from 'rxjs';
import {Traffic} from '../../domain/traffic';
import {TrafficDetails} from '../../domain/traffic-details';
import {ITrafficDetailsService} from './i-traffic-details-service';
import {TrafficMap} from '../../domain/traffic-map';


export class TrafficDetailsReader {
    public constructor(
        private readonly trafficDetailService: ITrafficDetailsService
    ) {
    }


    public read(trafficMap: TrafficMap): Observable<TrafficDetails[]> {
        const acList = this.getMissingTrafficDetailsAcList(trafficMap);

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
}
