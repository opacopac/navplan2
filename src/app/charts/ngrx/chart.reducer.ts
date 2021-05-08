import {ChartState} from './chart-state';
import {ChartActions} from './chart.actions';


const initialState: ChartState = {
    chartId: undefined,
    chartUrl: undefined,
    extent: undefined
};


export function chartReducer(state: ChartState = initialState, action: ChartActions) {
    switch (action.type) {
        default:
            return state;
    }
}
