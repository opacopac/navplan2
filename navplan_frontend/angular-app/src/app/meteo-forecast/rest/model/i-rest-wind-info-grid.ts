import {IRestGridDefinition} from './i-rest-grid-definition';
import {IRestWindInfo} from './i-rest-wind-info';


export interface IRestWindInfoGrid {
    grid: IRestGridDefinition;
    values: IRestWindInfo[];
}
