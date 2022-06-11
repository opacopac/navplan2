import {IRestWindSpeedDirGrid} from './i-rest-value-grid';
import {ValueGrid} from '../../meteo-dwd/domain-model/value-grid';
import {RestGridDefinitionConverter} from './rest-grid-definition-converter';
import {WindSpeedDir} from '../../meteo-dwd/domain-model/wind-speed-dir';
import {RestWindSpeedDirConverter} from './rest-wind-speed-dir-converter';


export class RestWindSpeedDirGridConverter {
    public static fromRest(restWindSpeedDirGrid: IRestWindSpeedDirGrid): ValueGrid<WindSpeedDir> {
        return new ValueGrid<WindSpeedDir>(
            RestGridDefinitionConverter.fromRest(restWindSpeedDirGrid.grid),
            RestWindSpeedDirConverter.fromRestList(restWindSpeedDirGrid.values)
        );
    }
}
