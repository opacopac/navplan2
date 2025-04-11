import {WeightItem} from '../../../aircraft-wnb/domain/model/weight-item';
import {FuelType} from '../../../aircraft/domain/model/fuel-type';


export interface PlanWnbState {
    weightItems: WeightItem[];
    fuelType: FuelType;
}
