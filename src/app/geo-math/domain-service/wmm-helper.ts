import {Position2d} from '../domain-model/geometry/position2d';
import {Angle} from '../domain-model/quantities/angle';
import {AngleUnit} from '../domain-model/quantities/units';
import {WorldMagneticModel} from '../domain-model/world-magnetic-model/WorldMagneticModel';
import {DatetimeHelper} from '../../system/domain-service/datetime/datetime-helper';

export class WmmHelper {
    private static wmm = new WorldMagneticModel();


    public static calcMagneticVariation(pos: Position2d): Angle {
        const decYear = DatetimeHelper.calcDecimalYear();
        const magvar = this.wmm.declination(0, pos.latitude, pos.longitude, decYear);

        return new Angle(magvar, AngleUnit.DEG);
    }
}
