import {MapFeaturesState} from './model/map-features-state';
import {MapFeaturesActions, MapFeaturesActionTypes} from './map-features.actions';


const initialState: MapFeaturesState = {
    extent: undefined,
    zoom: undefined,
    mapFeatures: undefined,
};


export function mapFeaturesReducer(state: MapFeaturesState = initialState, action: MapFeaturesActions) {
    switch (action.type) {
        case MapFeaturesActionTypes.MAPFEATURES_LOAD_SUCCESS:
            return { ...state, extent: action.extent, zoom: action.zoom, mapFeatures: action.mapFeatures };

        default:
            return state;
    }
}
