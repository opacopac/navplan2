import { Position2d } from './position';


export class Navaid {
    constructor(
        public id: number,
        public type: string,
        public kuerzel: string,
        public name: string,
        public position: Position2d,
        public elevation_m: number, // TODO: own class
        public frequency: string,
        public unit: string,
        public declination: number,
        public truenorth: boolean) {
    }
}
