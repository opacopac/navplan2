import {IWmmService} from './i-wmm.service';
import {Injectable} from '@angular/core';
import {WorldMagneticModel} from '../../domain-model/wmm/WorldMagneticModel';
import {DatetimeHelper} from '../../../system/domain-service/datetime/datetime-helper';
import {Angle} from '../../domain-model/quantities/angle';
import {AngleUnit} from '../../domain-model/quantities/angle-unit';
import {Position2d} from '../../domain-model/geometry/position2d';


@Injectable()
export class WmmService implements IWmmService {
    private wmm = new WorldMagneticModel();


    public calcMagneticVariation(pos: Position2d): Angle {
        const decYear = DatetimeHelper.calcDecimalYear();
        const magVar = this.wmm.declination(0, pos.latitude, pos.longitude, decYear);

        return new Angle(magVar, AngleUnit.DEG);
    }
}
