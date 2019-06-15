import {Volume} from '../../shared/model/quantities/volume';
import {Time} from '../../shared/model/quantities/time';
import {TimeUnit} from '../../shared/model/quantities/units';


export class RouteFuel {
    public tripTime = new Time(0, TimeUnit.M);
    public tripFuel: Volume;
    public alternateTime = new Time(0, TimeUnit.M);
    public alternateFuel: Volume;
    public reserveTime = new Time(45, TimeUnit.M);
    public reserveFuel: Volume;
    public minimumTime = new Time(0, TimeUnit.M);
    public minimumFuel: Volume;
    public extraTime = new Time(0, TimeUnit.M);
    public extraFuel: Volume;
    public blockTime = new Time(0, TimeUnit.M);
    public blockFuel: Volume;
}
