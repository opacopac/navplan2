import { Position2d } from '../position';


export interface WebcamRestItem {
    id: number;
    name: string;
    url: string;
    latitude: number;
    longitude: number;
}


export class Webcam {
    id: number;
    name: string;
    url: string;
    position: Position2d;


    constructor(restItem: WebcamRestItem) {
        this.id = restItem.id;
        this.name = restItem.name;
        this.url = restItem.url;
        this.position = new Position2d(restItem.longitude, restItem.latitude);
    }
}

