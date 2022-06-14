import {ValueGrid} from '../../domain/model/value-grid';
import {RestGridDefinitionConverter} from './rest-grid-definition-converter';
import {IRestWwGrid} from './i-rest-ww-grid';
import {RestWwConverter} from './rest-ww-converter';
import {WwValue} from '../../domain/model/ww-value';


export class RestWwGridConverter {
    public static fromRest(restWwGrid: IRestWwGrid): ValueGrid<WwValue> {
        return new ValueGrid<WwValue>(
            RestGridDefinitionConverter.fromRest(restWwGrid.grid),
            RestWwConverter.fromRestList(restWwGrid.values)
        );
    }
}
