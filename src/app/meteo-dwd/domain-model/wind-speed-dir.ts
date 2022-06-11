import {Speed} from '../../geo-physics/domain-model/quantities/speed';
import {Angle} from '../../geo-physics/domain-model/quantities/angle';
import {DataItem, DataItemType} from '../../common/model/data-item';


export class WindSpeedDir extends DataItem{
    constructor(
        public speed: Speed,
        public dir: Angle
    ) {
        super();
    }


    get dataItemType(): DataItemType {
        return DataItemType.dwdWindForecast;
    }
}
