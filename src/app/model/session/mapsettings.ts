import {MapbaselayerType} from '../ol-model/mapbaselayer-factory';
import {Position2d} from '../geometry/position2d';
import {Angle} from '../quantities/angle';
import {AngleUnit} from '../../services/utils/unitconversion.service';


export class Mapsettings {
    constructor(
        public baseMapType = MapbaselayerType.OPENTOPOMAP,
        public position = new Position2d(7.4971, 46.9141),
        public zoom = 11,
        public rotation = new Angle(0, AngleUnit.RAD)) {
    }
}
