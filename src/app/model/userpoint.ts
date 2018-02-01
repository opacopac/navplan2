import { Position2d } from './position';


export interface UserPointRestItem {
    id: number;
    type: string;
    name: string;
    latitude: number;
    longitude: number;
    remark: string;
    supp_info: string;
}


export class Userpoint {
    id: number;
    type: string;
    name: string;
    position: Position2d;
    latitude: number;
    longitude: number;
    remark: string;
    supp_info: string;


    constructor(restItem: UserPointRestItem) {
        this.id = restItem.id;
        this.type = restItem.type;
        this.name = restItem.name;
        this.position = new Position2d(restItem.longitude, restItem.latitude);
        this.remark = restItem.remark;
        this.supp_info = restItem.supp_info;
    }
}
