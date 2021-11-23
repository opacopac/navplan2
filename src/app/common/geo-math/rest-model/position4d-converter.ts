import {IRestPosition4d} from './i-rest-position4d';
import {Position4d} from '../domain-model/geometry/position4d';
import {Position2dConverter} from './position2d-converter';
import {TimestampConverter} from './timestamp-converter';
import {RestAltitudeConverter} from './rest-altitude-converter';


export class Position4dConverter {
    public static fromRest(restPos: IRestPosition4d): Position4d {
        const pos2d = Position2dConverter.fromRest(restPos[0]);
        return new Position4d(
            pos2d.longitude,
            pos2d.latitude,
            RestAltitudeConverter.fromRest(restPos[1]),
            TimestampConverter.fromRest(restPos[2])
        );
    }
}
