import {Position2d} from '../../domain/model/geometry/position2d';
import {IRestPosition2d} from './i-rest-position2d';


export class Position2dConverter {
    public static fromRest(restPos: IRestPosition2d): Position2d {
        return new Position2d(restPos[0], restPos[1]);
    }


    public static toRest(pos: Position2d): IRestPosition2d {
        return [pos.longitude, pos.latitude];
    }
}
