import {Position2d} from './position2d';
import {Angle} from '../quantities/angle';


export class BearingPos {
    public constructor(
        public position: Position2d,
        public bearing: Angle) {
    }
}
