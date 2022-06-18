import {IRestWindInfoGrid} from './i-rest-wind-info-grid';
import {ValueGrid} from '../../domain/model/value-grid';
import {RestGridDefinitionConverter} from './rest-grid-definition-converter';
import {WindInfo} from '../../domain/model/wind-info';
import {RestWindInfoConverter} from './rest-wind-info-converter';


export class RestWindInfoGridConverter {
    public static fromRest(restWindInfoGrid: IRestWindInfoGrid): ValueGrid<WindInfo> {
        return new ValueGrid<WindInfo>(
            RestGridDefinitionConverter.fromRest(restWindInfoGrid.grid),
            RestWindInfoConverter.fromRestList(restWindInfoGrid.values)
        );
    }
}
