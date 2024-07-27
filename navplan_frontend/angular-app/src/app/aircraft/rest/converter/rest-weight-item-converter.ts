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
            RestLengthConverter.fromRest(restWeightItem.arm),
            RestWeightConverter.fromRest(restWeightItem.maxWeight),
            RestVolumeConverter.fromRest(restWeightItem.maxFuel)
        );
    }


    public static toRest(aircraft: WeightItem): IRestWeightItem {
        return {
            type: WeightItemType[aircraft.type],
            name: aircraft.name,
            arm: RestLengthConverter.toRest(aircraft.arm),
            maxWeight: RestWeightConverter.toRest(aircraft.maxWeight),
            maxFuel: RestVolumeConverter.toRest(aircraft.maxFuel)
        };
    }


    public static fromRestList(restWeightItems: IRestWeightItem[]): WeightItem[] {
        return restWeightItems.map(restWeightItem => RestWeightItemConverter.fromRest(restWeightItem));
    }


    public static toRestList(aircrafts: WeightItem[]): IRestWeightItem[] {
        return aircrafts.map(aircraft => RestWeightItemConverter.toRest(aircraft));
    }
}
