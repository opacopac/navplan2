import {Position2d} from '../domain/geometry/position2d';
import {Angle} from '../domain/quantities/angle';
import {AngleUnit} from '../domain/quantities/units';
import {WorldMagneticModel} from '../domain/world-magnetic-model/WorldMagneticModel';
import {DatetimeHelper} from '../../system/use-case/datetime/datetime-helper';

export class WmmHelper {
    private static wmm = new WorldMagneticModel();


    public static calcMagneticVariation(pos: Position2d): Angle {
        const decYear = DatetimeHelper.calcDecimalYear();
        const magvar = this.wmm.declination(0, pos.latitude, pos.longitude, decYear);

        return new Angle(magvar, AngleUnit.DEG);
    }
}
