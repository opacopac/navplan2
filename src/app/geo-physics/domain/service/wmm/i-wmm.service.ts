import {Position2d} from '../../model/geometry/position2d';
import {Angle} from '../../model/quantities/angle';


export abstract class IWmmService {
    public abstract calcMagneticVariation(pos: Position2d): Angle;
}
