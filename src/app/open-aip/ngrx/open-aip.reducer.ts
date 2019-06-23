import {OpenAipState} from '../domain/open-aip-state';
import {OpenAipActions, OpenAIpActionTypes} from './open-aip.actions';


const initialState: OpenAipState = {
    extent: undefined,
    zoom: undefined,
    openAipItems: undefined,
};


export function openAipReducer(state: OpenAipState = initialState, action: OpenAipActions) {
    switch (action.type) {
        case OpenAIpActionTypes.OPEN_AIP_LOAD_ITEMS_SUCCESS:
            return { ...state, extent: action.extent, zoom: action.zoom, openAipItems: action.openAipItems };

        default:
            return state;
    }
}
