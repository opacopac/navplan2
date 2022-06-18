import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {DataItem, DataItemType} from '../../../common/model/data-item';


export class WindInfo extends DataItem{
    constructor(
        public speed: Speed,
        public dir: Angle,
        public gust: Speed
    ) {
        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.dwdWindForecast;
    }


    public hasSignificantGusts(): boolean {
        return this.gust.kt >= 16 && this.gust.kt - this.speed.kt >= 10;
    }
}
