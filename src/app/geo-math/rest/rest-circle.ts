import {IRestCircle} from './i-rest-circle';
import {Circle} from '../domain/geometry/circle';
import {RestPosition2d} from './rest-position2d';
import {RestLength} from './rest-length';


export class RestCircle {
    public static fromRest(restCircle: IRestCircle): Circle {
        return new Circle(
            RestPosition2d.fromRest(restCircle.center),
            RestLength.fromRest(restCircle.radius)
        );
    }
}
