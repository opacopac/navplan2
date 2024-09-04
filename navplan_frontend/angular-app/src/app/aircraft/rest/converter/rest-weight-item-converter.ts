import {WeightItem} from '../../domain/model/weight-item';
import {IRestWeightItem} from '../model/i-rest-weight-item';
import {RestLengthConverter} from '../../../geo-physics/rest/model/rest-length-converter';
import {RestWeightConverter} from '../../../geo-physics/rest/model/rest-weight-converter';
import {RestVolumeConverter} from '../../../geo-physics/rest/model/rest-volume-converter';
import {WeightItemType} from '../../domain/model/weight-item-type';


export class RestWeightItemConverter {
    public static fromRest(restWeightItem: IRestWeightItem): WeightItem {
        return new WeightItem(
            WeightItemType[restWeightItem.type],
            restWeightItem.name,
            RestLengthConverter.fromRest(restWeightItem.armLong),
            RestLengthConverter.fromRest(restWeightItem.armLat),
            RestWeightConverter.fromRest(restWeightItem.maxWeight),
            RestVolumeConverter.fromRest(restWeightItem.maxFuel),
            RestWeightConverter.fromRest(restWeightItem.defaultWeight),
            RestVolumeConverter.fromRest(restWeightItem.defaultFuel),
            RestWeightConverter.fromRest(restWeightItem.weight),
            RestVolumeConverter.fromRest(restWeightItem.fuel)
        );
    }


    public static toRest(weightItem: WeightItem): IRestWeightItem {
        return {
            type: WeightItemType[weightItem.type],
            name: weightItem.name,
            armLong: RestLengthConverter.toRest(weightItem.armLong),
            armLat: RestLengthConverter.toRest(weightItem.armLat),
            maxWeight: RestWeightConverter.toRest(weightItem.maxWeight),
            maxFuel: RestVolumeConverter.toRest(weightItem.maxFuel),
            defaultWeight: RestWeightConverter.toRest(weightItem.defaultWeight),
            defaultFuel: RestVolumeConverter.toRest(weightItem.defaultFuel),
            weight: RestWeightConverter.toRest(weightItem.weight),
            fuel: RestVolumeConverter.toRest(weightItem.fuel)
        };
    }


    public static fromRestList(restWeightItems: IRestWeightItem[]): WeightItem[] {
        return restWeightItems.map(restWeightItem => RestWeightItemConverter.fromRest(restWeightItem));
    }


    public static toRestList(weightItems: WeightItem[]): IRestWeightItem[] {
        return weightItems.map(weightItem => RestWeightItemConverter.toRest(weightItem));
    }
}
