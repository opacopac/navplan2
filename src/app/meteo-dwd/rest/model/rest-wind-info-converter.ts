import {IRestWindInfo} from './i-rest-wind-info';
import {WindInfo} from '../../domain/model/wind-info';
import {RestSpeedConverter} from '../../../geo-physics/rest/model/rest-speed-converter';
import {RestAngleConverter} from '../../../geo-physics/rest/model/rest-angle-converter';
import {Position2dConverter} from '../../../geo-physics/rest/model/position2d-converter';


export class RestWindInfoConverter {
    public static fromRestList(restWindInfos: IRestWindInfo[]): WindInfo[] {
        return restWindInfos.map(restWindInfo => RestWindInfoConverter.fromRest(restWindInfo));
    }


    public static fromRest(restWindInfo: IRestWindInfo): WindInfo {
        if (!restWindInfo) {
            return undefined;
        }

        return new WindInfo(
            RestSpeedConverter.fromRest(restWindInfo[0]),
            RestAngleConverter.fromRest(restWindInfo[1]),
            RestSpeedConverter.fromRest(restWindInfo[2]),
            Position2dConverter.fromRest(restWindInfo[3])
        );
    }
}
