import {IRestGridDefinition} from './i-rest-grid-definition';
import {IRestWindSpeedDir} from './i-rest-wind-speed-dir';


export interface IRestWindSpeedDirGrid {
    grid: IRestGridDefinition;
    values: IRestWindSpeedDir[];
}
