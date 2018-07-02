import {Time} from '../../model/quantities/time';
import {Fuel} from '../../model/quantities/fuel';


export class RouteFuel {
    public tripTime: Time;
    public tripFuel: Fuel;
    public alternateTime: Time;
    public alternateFuel: Fuel;
    public reserveTime: Time;
    public reserveFuel: Fuel;
    public minimumTime: Time;
    public minimumFuel: Fuel;
    public extraTime: Time;
    public extraFuel: Fuel;
    public blockTime: Time;
    public blockFuel: Fuel;
}
