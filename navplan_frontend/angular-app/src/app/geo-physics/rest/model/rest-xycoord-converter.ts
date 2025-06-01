import {IRestXycoord} from './i-rest-xycoord';
import {XyCoord} from '../../domain/model/geometry/xyCoord';


export class RestXycoordConverter {
    public static fromRest(restCoord: IRestXycoord): XyCoord | null {
        if (!restCoord) {
            return null;
        }

        return new XyCoord(restCoord[0], restCoord[1]);
    }


    public static toRest(coord: XyCoord): IRestXycoord | null {
        if (!coord) {
            return null;
        }

        return [coord.x, coord.y];
    }
}
