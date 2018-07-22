import { Position2d } from '../../shared/model/geometry/position2d';
import {DataItem, DataItemType} from '../../shared/model/data-item';


export class Reportingpoint extends DataItem {
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
        public position: Position2d) {

        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.reportingPoint;
    }
}
