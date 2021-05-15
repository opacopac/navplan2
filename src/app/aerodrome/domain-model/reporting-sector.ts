import {DataItem, DataItemType} from '../../common/model/data-item';
import {Polygon} from '../../common/geo-math/domain-model/geometry/polygon';
import {Length} from '../../common/geo-math/domain-model/quantities/length';


export class ReportingSector extends DataItem {
    constructor(
        public id: number,
        public airport_icao: string,
        public name: string,
        public heli: boolean,
        public inbd_comp: boolean,
        public outbd_comp: boolean,
        public polygon: Polygon,
        public alt_min?: Length,
        public alt_max?: Length
    ) {
        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.reportingSector;
    }
}
