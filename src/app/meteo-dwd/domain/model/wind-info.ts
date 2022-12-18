import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {DataItem, DataItemType} from '../../../common/model/data-item';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';


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
        return DataItemType.dwdWindForecast;
    }


    public hasGusts(): boolean {
        return this.gust.kt >= 16 && this.gust.kt - this.speed.kt >= 10;
    }


    public getGustLevel(): number {
        if (this.gust.kt - this.speed.kt > 25) {
            return 3; // violent gusts
        } else if (this.gust.kt - this.speed.kt > 15 && this.gust.kt - this.speed.kt <= 25) {
            return 2; // strong gusts
        } else if (this.gust.kt - this.speed.kt > 10 && this.gust.kt - this.speed.kt <= 15) {
            return 1; // gusts
        } else {
            return 0; // no gusts
        }
    }


    public hasViolentGusts(): boolean {
        return ;
    }
}
