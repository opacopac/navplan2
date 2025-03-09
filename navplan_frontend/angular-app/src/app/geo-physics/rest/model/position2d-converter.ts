import {Position2d} from '../../domain/model/geometry/position2d';
import {IRestPosition2d} from './i-rest-position2d';
import {HttpParams} from '@angular/common/http';


export class Position2dConverter {
    public static fromRest(restPos: IRestPosition2d): Position2d {
        return new Position2d(restPos[0], restPos[1]);
    }


    public static toRest(pos: Position2d): IRestPosition2d {
        return [pos.longitude, pos.latitude];
    }


    public static getUrlParams(pos: Position2d): HttpParams {
        return new HttpParams()
            .set('longitude', pos.longitude.toString())
            .set('latitude', pos.latitude.toString());
    }
}
