import {Position2d} from '../../geo-math/domain/geometry/position2d';
import {ChartPath} from './chart-path';


export interface ChartMapState {
    isActive: boolean;
    lastClickedPos: Position2d;
    chartPath: ChartPath;
}
