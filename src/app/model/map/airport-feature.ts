import { Position2d } from '../position';


export interface AirportFeatureRestItem {
    type: string;
    name: string;
}


export class AirportFeature {
    type: string;
    name: string;
    position: Position2d;

    constructor(restItem: AirportFeatureRestItem, position: Position2d) {
        this.type = restItem.type;
        this.name = restItem.name;
        this.position = position;
    }
}
