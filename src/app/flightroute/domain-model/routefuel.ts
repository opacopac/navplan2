import {Volume} from '../../common/geo-math/domain-model/quantities/volume';
import {Time} from '../../common/geo-math/domain-model/quantities/time';
import {TimeUnit} from '../../common/geo-math/domain-model/quantities/units';


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
