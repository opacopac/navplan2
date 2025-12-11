import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {DataItem, DataItemType} from '../../../common/domain/model/data-item';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {GustLevel} from './gust-level';


export class WindInfo extends DataItem{
    constructor(
        public speed: Speed,
        public dir: Angle,
        public gust: Speed,
        public pos: Position2d
    ) {
        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.meteoWindForecast;
    }


    public hasGusts(): boolean {
        return this.gust.kt >= 16 && this.gust.kt - this.speed.kt >= 10;
    }


    public getGustLevel(): GustLevel {
        if (this.gust.kt - this.speed.kt > 25) {
            return GustLevel.VIOLENT_GUSTS;
        } else if (this.gust.kt - this.speed.kt > 15 && this.gust.kt - this.speed.kt <= 25) {
            return GustLevel.STRONG_GUSTS;
        } else if (this.gust.kt - this.speed.kt > 10 && this.gust.kt - this.speed.kt <= 15) {
            return GustLevel.GUSTS;
        } else {
            return GustLevel.NONE;
        }
    }
}
