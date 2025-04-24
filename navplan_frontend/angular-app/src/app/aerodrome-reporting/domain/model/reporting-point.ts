import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {DataItem, DataItemType} from '../../../common/domain/model/data-item';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class ReportingPoint extends DataItem {
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


    public getPosition(): Position2d {
        return this.position;
    }
}
