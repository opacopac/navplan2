import { Polygon } from './polygon';


export class Airspace {
    constructor(
        public id: number,
        public aip_id: number,
        public category: string,
        public country: string,
        public name: string,
        public alt: { top: AirspaceAltitude, bottom: AirspaceAltitude },
        public polygon: Polygon) {
    }
}


export class AirspaceAltitude {
    constructor(
        public ref: string,
        public height: number,
        public unit: string) {
    }
}
