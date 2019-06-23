import {IRestPosition4d} from './i-rest-position4d';
import {Position4d} from '../geometry/position4d';
import {RestPosition2d} from './rest-position2d';
import {RestTimestamp} from './rest-timestamp';
import {RestAltitude} from './rest-altitude';


export class RestPosition4d {
    public static fromRest(restPos: IRestPosition4d): Position4d {
        const pos2d = RestPosition2d.fromRest(restPos.pos);
        return new Position4d(
            pos2d.longitude,
            pos2d.latitude,
            RestAltitude.fromRest(restPos.alt),
            RestTimestamp.fromRest(restPos.time)
        );
    }
}
