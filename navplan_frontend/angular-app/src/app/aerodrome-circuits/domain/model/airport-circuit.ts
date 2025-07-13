import {DataItem, DataItemType} from '../../../common/domain/model/data-item';
import {MultiLineString} from '../../../geo-physics/domain/model/geometry/multi-line-string';


export class AirportCircuit extends DataItem {
    constructor(
        public airportIcao: string,
        public name: string,
        public multiLineString: MultiLineString
    ) {
        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.circuit;
    }
}
