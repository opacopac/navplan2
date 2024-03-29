import {IRestSmaStation} from './i-rest-sma-station';
import {SmaStation} from '../../domain/model/sma-station';
import {Position2dConverter} from '../../../geo-physics/rest/model/position2d-converter';
import {RestAltitudeConverter} from '../../../geo-physics/rest/model/rest-altitude-converter';


export class RestSmaStationConverter {
    public static fromRest(restSmaStation: IRestSmaStation): SmaStation {
        return new SmaStation(
            restSmaStation.id,
            restSmaStation.name,
            Position2dConverter.fromRest(restSmaStation.pos),
            RestAltitudeConverter.fromRest(restSmaStation.alt)
        );
    }
}
