import {ChartMapState} from '../domain/chart-map-state';
import {ChartMapActions, ChartMapActionTypes} from './chart-map.actions';
import {ChartPath} from '../domain/chart-path';
import {Line} from '../../geo-math/domain/geometry/line';


const initialState: ChartMapState = {
    isActive: false,
    lastClickedPos: undefined,
    chartPath: new ChartPath()
};


export function chartMapReducer(state: ChartMapState = initialState, action: ChartMapActions) {
    switch (action.type) {
        case ChartMapActionTypes.CHARTMAP_ACTIVATE:
            return { ...state, isActive: action.isActive };

        case ChartMapActionTypes.CHARTMAP_CLICKED:
            if (state.lastClickedPos === undefined) {
                return { ...state,
                    lastClickedPos: action.clickPos };
            } else {
                const newLine = new Line(state.lastClickedPos.clone(), action.clickPos.clone());
                const newChartPath = state.chartPath.clone();
                newChartPath.addLine(newLine);
                return { ...state,
                    lastClickedPos: undefined,
                    chartPath: newChartPath
                };
            }

        default:
            return state;
    }
}
