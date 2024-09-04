import {IRestWeight} from '../../../geo-physics/rest/model/i-rest-weight';
import {IRestLength} from '../../../geo-physics/rest/model/i-rest-length';
import {IRestVolume} from '../../../geo-physics/rest/model/i-rest-volume';

export interface IRestWeightItem {
    type: string;
    name: string;
    armLong: IRestLength;
    armLat: IRestLength;
    maxWeight: IRestWeight;
    maxFuel: IRestVolume;
    defaultWeight: IRestWeight;
    defaultFuel: IRestVolume;
    weight: IRestWeight;
    fuel: IRestVolume;
}
