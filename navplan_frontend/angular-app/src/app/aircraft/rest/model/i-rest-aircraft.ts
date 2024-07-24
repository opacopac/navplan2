import {IRestSpeed} from '../../../geo-physics/rest/model/i-rest-speed';
import {IRestConsumption} from '../../../geo-physics/rest/model/i-rest-consumption';
import {IRestWeight} from '../../../geo-physics/rest/model/i-rest-weight';

export interface IRestAircraft {
    id: number;
    vehicleType: string;
    registration: string;
    icaoType: string;
    cruiseSpeed: IRestSpeed;
    cruiseFuel: IRestConsumption;
    fuelType: string;
    mtow: IRestWeight;
    bew: IRestWeight;
}
