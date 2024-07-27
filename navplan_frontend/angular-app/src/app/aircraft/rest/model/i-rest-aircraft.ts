import {IRestSpeed} from '../../../geo-physics/rest/model/i-rest-speed';
import {IRestConsumption} from '../../../geo-physics/rest/model/i-rest-consumption';
import {IRestWeight} from '../../../geo-physics/rest/model/i-rest-weight';
import {IRestDistancePerformanceTable} from './i-rest-distance-performance-table';
import {IRestWeightItem} from './i-rest-weight-item';
import {IRestWnbEnvelope} from './i-rest-wnb-envelope';

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
    perfTakeoffGroundRoll: IRestDistancePerformanceTable;
    perfTakeoffDist50ft: IRestDistancePerformanceTable;
    perfLandingGroundRoll: IRestDistancePerformanceTable;
    perfLandingDist50ft: IRestDistancePerformanceTable;
    wnbWeightItems: IRestWeightItem[];
    wnbEnvelopes: IRestWnbEnvelope[];
}
