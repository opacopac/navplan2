import {Flightroute} from '../domain-model/flightroute';
import {IRestFuelCalc} from './i-rest-fuel-calc';
import {RestTimeConverter} from '../../common/geo-math/rest-model/rest-time-converter';
import {RestVolumeConverter} from '../../common/geo-math/rest-model/rest-volume-converter';


export class RestFuelCalcConverter {
    public static toRest(flightroute: Flightroute): IRestFuelCalc {
        return {
            triptime: RestTimeConverter.toRest(flightroute.fuel.tripTime),
            alttime: RestTimeConverter.toRest(flightroute.fuel.alternateTime),
            restime: RestTimeConverter.toRest(flightroute.fuel.reserveTime),
            mintime: RestTimeConverter.toRest(flightroute.fuel.minimumTime),
            extratime: RestTimeConverter.toRest(flightroute.fuel.extraTime),
            blocktime: RestTimeConverter.toRest(flightroute.fuel.blockTime),
            tripvol: RestVolumeConverter.toRest(flightroute.fuel.tripFuel),
            altvol: RestVolumeConverter.toRest(flightroute.fuel.alternateFuel),
            resvol: RestVolumeConverter.toRest(flightroute.fuel.reserveFuel),
            minvol: RestVolumeConverter.toRest(flightroute.fuel.minimumFuel),
            extravol: RestVolumeConverter.toRest(flightroute.fuel.extraFuel),
            blockvol: RestVolumeConverter.toRest(flightroute.fuel.blockFuel),
        };
    }
}
