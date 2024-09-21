import {Pressure} from '../../../geo-physics/domain/model/quantities/pressure';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';
import {DistancePerformanceTable} from '../../../aircraft/domain/model/distance-performance-table';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {AtmosphereService} from '../../../geo-physics/domain/service/meteo/atmosphere.service';
import {PerformanceTableAltitudeReference} from '../../../aircraft/domain/model/performance-table-altitude-reference';

export class PlanPerformanceService {
    public static calcTakeOffGroundRoll(
        elevation: Length,
        qnh: Pressure,
        oat: Temperature,
        isGrassRwy: boolean,
        isWetRwy: boolean,
        rwyDownhillSlopePercent: number,
        headwind: Speed,
        tailwind: Speed,
        performanceTable: DistancePerformanceTable
    ): number {
        const lookupAlt = performanceTable.altitudeReference === PerformanceTableAltitudeReference.FIELD_ALTITUDE
            ? elevation
            : AtmosphereService.calcPressureAltitude(elevation, qnh);
        const pa = AtmosphereService.calcPressureAltitude(elevation, qnh);
        return 0;
    }
}
