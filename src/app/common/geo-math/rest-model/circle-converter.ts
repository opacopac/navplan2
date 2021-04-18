import {IRestCircle} from './i-rest-circle';
import {Circle} from '../domain-model/geometry/circle';
import {Position2dConverter} from './position2d-converter';
import {LengthConverter} from './length-converter';


export class CircleConverter {
    public static fromRest(restCircle: IRestCircle): Circle {
        return new Circle(
            Position2dConverter.fromRest(restCircle.center),
            LengthConverter.fromRest(restCircle.radius)
        );
    }
}
