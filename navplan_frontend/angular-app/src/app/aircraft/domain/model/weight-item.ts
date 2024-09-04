import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Volume} from '../../../geo-physics/domain/model/quantities/volume';
import {WeightItemType} from './weight-item-type';

export class WeightItem {
    constructor(
        public type: WeightItemType,
        public name: string,
        public armLong: Length,
        public armLat: Length,
        public maxWeight: Weight,
        public maxFuel: Volume,
        public defaultWeight: Weight,
        public defaultFuel: Volume,
        public weight: Weight,
        public fuel: Volume
    ) {
    }


    public clone(): WeightItem {
        return new WeightItem(
            this.type,
            this.name,
            this.armLong?.clone(),
            this.armLat?.clone(),
            this.maxWeight?.clone(),
            this.maxFuel?.clone(),
            this.defaultWeight?.clone(),
            this.defaultFuel?.clone(),
            this.weight?.clone(),
            this.fuel?.clone()
        );
    }
}
