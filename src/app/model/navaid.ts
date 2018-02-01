import { Position2d } from './position';


export interface NavaidRestItem {
    id: number;
    type: string;
    kuerzel: string;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    frequency: string;
    unit: string;
    declination: number;
    truenorth: boolean;
}


export class Navaid {
    public id: number;
    public type: string;
    public kuerzel: string;
    public name: string;
    public position: Position2d;
    public elevation: number;
    public frequency: string;
    public unit: string;
    public declination: number;
    public truenorth: boolean;


    constructor(restItem: NavaidRestItem) {
        this.id = restItem.id;
        this.type = restItem.type;
        this.kuerzel = restItem.kuerzel;
        this.name = restItem.name;
        this.position = new Position2d(restItem.longitude, restItem.latitude);
        this.elevation = restItem.elevation;
        this.frequency = restItem.frequency;
        this.unit = restItem.unit;
        this.declination = restItem.declination;
        this.truenorth = restItem.truenorth;
    }
}
