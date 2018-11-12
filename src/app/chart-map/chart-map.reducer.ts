import {ChartMapState} from './chart-map-state';
import {ChartMapActions, ChartMapActionTypes} from './chart-map.actions';
import {ChartPath} from './components/model/chart-path';
import {Line} from '../shared/model/geometry/line';


const initialState: ChartMapState = {
    lastClickedPos: undefined,
    chartPath: new ChartPath()
};


export function chartMapReducer(state: ChartMapState = initialState, action: ChartMapActions) {
    switch (action.type) {
        case ChartMapActionTypes.CHARTMAP_CLICKED:
            if (state.lastClickedPos === undefined) {
                return { ...state,
                    lastClickedPos: action.clickPos };
            } else {
                const newLine = new Line(state.lastClickedPos.clone(), action.clickPos.clone());
                const newChartPath = state.chartPath.clone();
                newChartPath.lines.push(newLine);
                return { ...state,
                    lastClickedPos: undefined,
                    chartPath: newChartPath
                };
            }

        default:
            return state;
    }
}
