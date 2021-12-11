import {Position2d} from '../../domain-model/geometry/position2d';
import {Angle} from '../../domain-model/quantities/angle';


export abstract class IWmmService {
    public abstract calcMagneticVariation(pos: Position2d): Angle;
}
