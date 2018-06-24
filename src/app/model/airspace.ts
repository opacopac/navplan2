import { Polygon } from './geometry/polygon';
import { DataItem } from './data-item';


export class Airspace extends DataItem {
    constructor(
        public id: number,
        public aip_id: number,
        public category: string,
        public country: string,
        public name: string,
        public alt: { top: AirspaceAltitude, bottom: AirspaceAltitude },
        public polygon: Polygon) {

        super();
    }
}


export class AirspaceAltitude {
    constructor(
        public ref: string,
        public height: number,
        public unit: string) {
    }
}
