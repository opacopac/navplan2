import {Volume} from '../../geo-math/domain/quantities/volume';
import {Time} from '../../geo-math/domain/quantities/time';
import {TimeUnit} from '../../geo-math/domain/quantities/units';


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
