import {IRestExtent2d} from './i-rest-extent2d';
import {Extent2d} from '../../domain/model/geometry/extent2d';
import {Position2dConverter} from './position2d-converter';


export class RestExtent2dConverter {
    public static fromRest(restExtent: IRestExtent2d): Extent2d {
        return restExtent ? new Extent2d(
            restExtent[0][0],
            restExtent[0][1],
            restExtent[1][0],
            restExtent[1][1]
        ) : undefined;
    }


    public static toRest(extent: Extent2d): IRestExtent2d {
        return extent ? [
            Position2dConverter.toRest(extent.minPos),
            Position2dConverter.toRest(extent.maxPos)
        ] : undefined;
    }
}
