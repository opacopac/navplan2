import {IRestCircle} from './i-rest-circle';
import {Circle} from '../../geo-physics/domain-model/geometry/circle';
import {Position2dConverter} from './position2d-converter';
import {RestLengthConverter} from './rest-length-converter';


export class RestCircleConverter {
    public static fromRest(restCircle: IRestCircle): Circle {
        return new Circle(
            Position2dConverter.fromRest(restCircle.center),
            RestLengthConverter.fromRest(restCircle.radius)
        );
    }
}
