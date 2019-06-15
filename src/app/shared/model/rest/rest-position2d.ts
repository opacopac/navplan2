import {Position2d} from '../geometry/position2d';
import {IRestPosition2d} from './i-rest-position2d';


export class RestPosition2d {
    public static fromRest(restPos: IRestPosition2d): Position2d {
        if (!(typeof restPos[0] === 'number') || !(typeof restPos[1] === 'number')) {
            throw new TypeError('ERROR parsing position2d: both parameters must be of type number');
        }

        return new Position2d(restPos[0], restPos[1]);
    }
}
