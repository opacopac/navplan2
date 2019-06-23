import { Polygon } from '../../shared/model/geometry/polygon';
import {DataItem, DataItemType} from '../../shared/model/data-item';
import {Altitude} from '../../shared/model/geometry/altitude';


export class Airspace extends DataItem {
    constructor(
        public id: number,
        public aip_id: number,
        public category: string,
        public country: string,
        public name: string,
        public alt_bottom: Altitude,
        public alt_top: Altitude,
        public polygon: Polygon
    ) {
        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.airspace;
    }
}
