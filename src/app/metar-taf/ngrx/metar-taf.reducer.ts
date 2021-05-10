import {MetarTafState} from './metar-taf-state';
import {MetarTafActions, MetarTafActionTypes} from './metar-taf.actions';


const initialState: MetarTafState = {
    extent: undefined,
    zoom: undefined,
    metarTafList: undefined,
    timestampMs: 0
};


export function metarTafReducer(state: MetarTafState = initialState, action: MetarTafActions) {
    switch (action.type) {
        case MetarTafActionTypes.METARTAF_READ_SUCCESS:
            return {
                ...state,
                extent: action.result.extent,
                zoom: action.result.zoom,
                metarTafList: action.result.metarTafList,
                timestampMs: action.result.timestampMs
            };

        default:
            return state;
    }
}
