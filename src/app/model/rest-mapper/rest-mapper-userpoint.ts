import { Position2d } from '../geometry/position2d';
import { Userpoint } from '../userpoint';


export interface UserPointRestItem {
    id: number;
    type: string;
    name: string;
    latitude: number;
    longitude: number;
    remark: string;
    supp_info: string;
}


export class RestMapperUserpoint {
    public static getUserpointFromRestItem(restItem: UserPointRestItem): Userpoint {
        return new Userpoint(
            restItem.id,
            restItem.type,
            restItem.name,
            new Position2d(restItem.longitude, restItem.latitude),
            restItem.remark,
            restItem.supp_info);
    }
}
