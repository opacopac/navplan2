import {Fuel} from '../../shared/model/quantities/fuel';
import {Time} from '../../shared/model/quantities/time';
import {TimeUnit} from '../../shared/model/units';


export class RouteFuel {
    public tripTime = new Time(0, TimeUnit.M);
    public tripFuel: Fuel;
    public alternateTime = new Time(0, TimeUnit.M);
    public alternateFuel: Fuel;
    public reserveTime = new Time(45, TimeUnit.M);
    public reserveFuel: Fuel;
    public minimumTime = new Time(0, TimeUnit.M);
    public minimumFuel: Fuel;
    public extraTime = new Time(0, TimeUnit.M);
    public extraFuel: Fuel;
    public blockTime = new Time(0, TimeUnit.M);
    public blockFuel: Fuel;
}
