import { Polygon } from './polygon';
import { DataItem } from './data-item';


export class Reportingsector extends DataItem {
    constructor(
        public id: number,
        public type: string,
        public airport_icao: string,
        public name: string,
        public heli: boolean,
        public inbd_comp: boolean,
        public outbd_comp: boolean,
        public min_ft: number,
        public max_ft: number,
        public polygon: Polygon) {

        super();
    }
}
