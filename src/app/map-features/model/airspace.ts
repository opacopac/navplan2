import { Polygon } from '../../shared/model/geometry/polygon';
import {DataItem, DataItemType} from '../../shared/model/data-item';


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


    public get dataItemType(): DataItemType {
        return DataItemType.airspace;
    }
}


export class AirspaceAltitude {
    constructor(
        public ref: string,
        public height: number,
        public unit: string) {
    }
}
