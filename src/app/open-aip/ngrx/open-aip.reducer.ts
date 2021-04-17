import {OpenAipState} from '../domain-model/open-aip-state';
import {OpenAipActions, OpenAipActionTypes} from './open-aip.actions';
import {BaseMapActions} from '../../base-map/ngrx/base-map.actions';


const initialState: OpenAipState = {
    extent: undefined,
    zoom: undefined,
    openAipItems: undefined,
    timestampMs: 0
};


export function openAipReducer(state: OpenAipState = initialState, action: OpenAipActions | BaseMapActions) {
    switch (action.type) {
        case OpenAipActionTypes.OPEN_AIP_READ_ITEMS_SUCCESS:
            return {
                ...state,
                extent: action.result.extent,
                zoom: action.result.zoom,
                openAipItems: action.result.openAipItems,
                timestampMs: action.result.timestampMs
            };

        default:
            return state;
    }
}
