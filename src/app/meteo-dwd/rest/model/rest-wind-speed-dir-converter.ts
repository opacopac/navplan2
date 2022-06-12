import {IRestWindSpeedDir} from './i-rest-wind-speed-dir';
import {WindSpeedDir} from '../../domain/model/wind-speed-dir';
import {RestSpeedConverter} from '../../../geo-physics-rest/rest-model/rest-speed-converter';
import {RestAngleConverter} from '../../../geo-physics-rest/rest-model/rest-angle-converter';


export class RestWindSpeedDirConverter {
    public static fromRestList(restWindSpeedDirList: IRestWindSpeedDir[]): WindSpeedDir[] {
        return restWindSpeedDirList.map(restWindSpeedDir => RestWindSpeedDirConverter.fromRest(restWindSpeedDir));
    }


    public static fromRest(restWindSpeedDir: IRestWindSpeedDir): WindSpeedDir {
        if (!restWindSpeedDir) {
            return undefined;
        }

        return new WindSpeedDir(
            RestSpeedConverter.fromRest(restWindSpeedDir[0]),
            RestAngleConverter.fromRest(restWindSpeedDir[1])
        );
    }
}
