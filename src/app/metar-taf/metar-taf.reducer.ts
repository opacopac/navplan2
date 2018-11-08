import {MetarTafState} from './metar-taf-state';
import {MetarTafActions, MetarTafActionTypes} from './metar-taf.actions';

const initialState: MetarTafState = {
    extent: undefined,
    zoom: undefined,
    metarTafList: undefined
};


export function metarTafReducer(state: MetarTafState = initialState, action: MetarTafActions) {
    switch (action.type) {
        case MetarTafActionTypes.METARTAF_LOAD_SUCCESS:
            return { ...state, extent: action.extent, zoom: action.zoom, metarTafList: action.metarTafList };

        default:
            return state;
    }
}
