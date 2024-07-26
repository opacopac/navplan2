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
    ) {
    }
}
