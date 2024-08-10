import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Volume} from '../../../geo-physics/domain/model/quantities/volume';
import {WeightItemType} from './weight-item-type';

export class WeightItem {
    constructor(
        public type: WeightItemType,
        public name: string,
        public arm: Length,
        public maxWeight: Weight,
        public maxFuel: Volume,
        public weight: Weight,
        public fuel: Volume
    ) {
    }


    public clone(): WeightItem {
        return new WeightItem(
            this.type,
            this.name,
            this.arm?.clone(),
            this.maxWeight?.clone(),
            this.maxFuel?.clone(),
            this.weight?.clone(),
            this.fuel?.clone()
        );
    }


    public applyValuesFrom(weightItem: WeightItem): void {
        this.type = weightItem.type;
        this.name = weightItem.name;
        this.arm = weightItem.arm;
        this.maxWeight = weightItem.maxWeight;
        this.maxFuel = weightItem.maxFuel;
        this.weight = weightItem.weight;
        this.fuel = weightItem.fuel;
    }
}
