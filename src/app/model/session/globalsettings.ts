import {Angle} from '../quantities/angle';
import {Altitude} from '../quantities/altitude';
import {AngleUnit, LengthUnit} from '../../services/utils/unitconversion.service';


export class Globalsettings {
    constructor(
        public variation = new Angle(2, AngleUnit.DEG),
        public maxTrafficAltitude = new Altitude(15000, LengthUnit.FT)) {
    }
}
