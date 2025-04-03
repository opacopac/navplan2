import {WeightItem} from '../../../../aircraft/domain/model/weight-item';
import {FuelType} from '../../../../aircraft/domain/model/fuel-type';


export interface PlanWnbState {
    weightItems: WeightItem[];
    fuelType: FuelType;
}
