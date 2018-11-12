import {Position2d} from '../shared/model/geometry/position2d';
import {ChartPath} from './components/model/chart-path';


export interface ChartMapState {
    lastClickedPos: Position2d;
    chartPath: ChartPath;
}
