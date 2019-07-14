import {DataItem, DataItemType} from '../../shared/model/data-item';
import {Polygon} from '../../geo-math/domain/geometry/polygon';
import {Length} from '../../geo-math/domain/quantities/length';


export class Reportingsector extends DataItem {
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
