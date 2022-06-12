import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {DataItem, DataItemType} from '../../../common/model/data-item';


export class AirportChart extends DataItem {
    constructor(
        public id: number,
        public airportIcao: string,
        public source: string,
        public type: string,
        public fileName: string,
        public extent: Extent2d
    ) {
        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.airportChart;
    }
}
