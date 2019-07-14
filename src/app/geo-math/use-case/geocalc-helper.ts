import {Position2d} from '../domain/geometry/position2d';
import {Angle} from '../domain/quantities/angle';
import {AngleUnit, LengthUnit} from '../domain/quantities/units';
import {Length} from '../domain/quantities/length';
import {getDistance} from 'ol/sphere';


export class GeocalcHelper {
    public static calcDistance(pos1: Position2d, pos2: Position2d): Length {
        if (!pos1 || !pos2) {
            return undefined;
        }

        return new Length(getDistance(pos1.toArray(), pos2.toArray()) * 0.000539957, LengthUnit.NM);
    }


    public static calcBearing(pos1: Position2d, pos2: Position2d, magvar: Angle = Angle.getZero()): Angle {
        if (!pos1 || !pos2 || !magvar) {
            return undefined;
        }

        const toRad = (Math.PI / 180);
        const toDeg = (180 / Math.PI);
        const f1 = pos1.latitude * toRad;
        const f2 = pos2.latitude * toRad;
        const dl = (pos2.longitude - pos1.longitude) * toRad;
        const y = Math.sin(dl) * Math.cos(f2);
        const x = Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(dl);
        const t = Math.atan2(y, x);

        return new Angle((t * toDeg + 360) % 360 - magvar.getValue(AngleUnit.DEG), AngleUnit.DEG);
    }
}
