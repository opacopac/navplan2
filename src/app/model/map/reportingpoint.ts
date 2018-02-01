import { Position2d } from '../position';


export interface ReportingPointRestItem {
    id: number;
    type: string;
    airport_icao: string;
    name: string;
    heli: boolean;
    inbd_comp: boolean;
    outbd_comp: boolean;
    min_ft: number;
    max_ft: number;
    latitude: number;
    longitude: number;
    polygon: [number, number][];
}


export class Reportingpoint {
    id: number;
    type: string;
    airport_icao: string;
    name: string;
    heli: boolean;
    inbd_comp: boolean;
    outbd_comp: boolean;
    min_ft: number;
    max_ft: number;
    position: Position2d;


    constructor(restItem: ReportingPointRestItem) {
        this.id = restItem.id;
        this.type = restItem.type;
        this.airport_icao = restItem.airport_icao;
        this.name = restItem.name;
        this.heli = restItem.heli;
        this.inbd_comp = restItem.inbd_comp;
        this.outbd_comp = restItem.outbd_comp;
        this.min_ft = restItem.min_ft;
        this.max_ft = restItem.max_ft;
        this.position = new Position2d(restItem.longitude, restItem.latitude);
    }
}
