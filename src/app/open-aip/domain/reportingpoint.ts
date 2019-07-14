import {Position2d} from '../../geo-math/domain/geometry/position2d';
import {DataItem, DataItemType} from '../../shared/model/data-item';
import {Length} from '../../geo-math/domain/quantities/length';


export class Reportingpoint extends DataItem {
    constructor(
        public id: number,
        public airport_icao: string,
        public name: string,
        public heli: boolean,
        public inbd_comp: boolean,
        public outbd_comp: boolean,
        public position: Position2d,
        public alt_min?: Length,
        public alt_max?: Length
    ) {
        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.reportingPoint;
    }
}
