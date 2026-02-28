import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Time} from '../../../geo-physics/domain/model/quantities/time';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';


export class AircraftClimbPerformanceService {
    public static SERVICE_CEILING_ROC_FTPM = 100;


    public static calcAbsoluteCeiling(rocSeaLevel: Speed, serviceCeiling: Length): Length {
        const rocSeaLevelFt = (rocSeaLevel.fpm * serviceCeiling.ft)
            / (rocSeaLevel.fpm - AircraftClimbPerformanceService.SERVICE_CEILING_ROC_FTPM);

        return Length.ofFt(rocSeaLevelFt);
    }


    public static calcFlightTime(distance: Length, speed: Speed, extraTime?: Time): Time {
        const timeMin = distance.nm / speed.kt * 60 + (extraTime ? extraTime.min : 0);

        return Time.ofMin(timeMin);
    }


    public static calcClimbTargetAlt(startingAlt: Length, time: Time, rocSeaLevel: Speed, serviceCeiling: Length): Length {
        const absoluteCeiling = AircraftClimbPerformanceService.calcAbsoluteCeiling(rocSeaLevel, serviceCeiling);

        const targetAltFt = startingAlt.ft +
            (absoluteCeiling.ft - startingAlt.ft) * (1 - Math.exp(-time.min * rocSeaLevel.fpm / absoluteCeiling.ft));

        return Length.ofFt(targetAltFt);
    }


    public static calcClimbStartingAlt(targetAlt: Length, climbTime: Time, rocSeaLevel: Speed, serviceCeiling: Length): Length {
        const absoluteCeiling = AircraftClimbPerformanceService.calcAbsoluteCeiling(rocSeaLevel, serviceCeiling);
        if (targetAlt.ft >= absoluteCeiling.ft) {
            return absoluteCeiling; // Cannot climb above absolute ceiling
        }

        const startingAltFt = absoluteCeiling.ft -
            (absoluteCeiling.ft - targetAlt.ft) * Math.exp(climbTime.min * rocSeaLevel.fpm / absoluteCeiling.ft);

        return Length.ofFt(startingAltFt);
    }


    public static calcDescentStartingAlt(targetAlt: Length, descentTime: Time, rod: Speed): Length {
        const startingAltFt =  targetAlt.ft + descentTime.min * rod.fpm;

        return Length.ofFt(startingAltFt);
    }
}
