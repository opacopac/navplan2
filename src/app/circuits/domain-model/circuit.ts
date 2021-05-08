import {DataItem, DataItemType} from '../../common/model/data-item';
import {MultiLineString} from '../../common/geo-math/domain-model/geometry/multi-line-string';


export class Circuit extends DataItem {
    constructor(
        public airportIcao: string,
        public multiLineString: MultiLineString
    ) {
        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.circuit;
    }
}
