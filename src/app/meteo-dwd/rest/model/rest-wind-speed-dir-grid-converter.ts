import {IRestWindSpeedDirGrid} from './i-rest-wind-speed-dir-grid';
import {ValueGrid} from '../../domain/model/value-grid';
import {RestGridDefinitionConverter} from './rest-grid-definition-converter';
import {WindSpeedDir} from '../../domain/model/wind-speed-dir';
import {RestWindSpeedDirConverter} from './rest-wind-speed-dir-converter';


export class RestWindSpeedDirGridConverter {
    public static fromRest(restWindSpeedDirGrid: IRestWindSpeedDirGrid): ValueGrid<WindSpeedDir> {
        return new ValueGrid<WindSpeedDir>(
            RestGridDefinitionConverter.fromRest(restWindSpeedDirGrid.grid),
            RestWindSpeedDirConverter.fromRestList(restWindSpeedDirGrid.values)
        );
    }
}
