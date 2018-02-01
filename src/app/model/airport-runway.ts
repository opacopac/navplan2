import { Position2d } from './position';


export interface AirportRunwayRestItem {
    name: string;
    surface: string;
    length: number;
    width: number;
    direction1: number;
    direction2: number;
    tora1: number;
    tora2: number;
    lda1: number;
    lda2: number;
    papi1: boolean;
    papi2: boolean;
}


export class AirportRunway {
    name: string;
    surface: string;
    length: number;
    width: number;
    direction1: number;
    direction2: number;
    tora1: number;
    tora2: number;
    lda1: number;
    lda2: number;
    papi1: boolean;
    papi2: boolean;
    position: Position2d;
    isMil: boolean;


    constructor(restItem: AirportRunwayRestItem, position: Position2d, isMil: boolean) {
        this.name = restItem.name;
        this.surface = restItem.surface;
        this.length = restItem.length;
        this.width = restItem.width;
        this.direction1 = restItem.direction1;
        this.tora1 = restItem.tora1;
        this.lda1 = restItem.lda1;
        this.lda2 = restItem.lda2;
        this.papi1 = restItem.papi1;
        this.papi2 = restItem.papi2;
        this.position = position;
        this.isMil = isMil;
    }
}
