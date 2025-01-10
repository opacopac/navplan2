import {Airport} from '../model/airport';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {AirportRunway} from '../model/airport-runway';


export class AirportRunwayService {
    public static calcThresholdPoints(airport: Airport, rwy: AirportRunway): [Length, Length] {
        const oppRwy = airport.findOppositeRunway(rwy);

        if (oppRwy && rwy.tora && oppRwy.tora) {
            return [
                Length.ofM(rwy.length.m - oppRwy.tora.m),
                Length.ofM(rwy.tora.m)
            ];
        } else if (!oppRwy && rwy.lda) {
            return [Length.ofM(rwy.length.m - rwy.lda.m), rwy.length];
        } else {
            return [Length.ofZero(), rwy.length];
        }
    }
}
