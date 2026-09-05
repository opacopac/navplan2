import {createReducer, on} from '@ngrx/store';
import {MeteoRadarActions} from './meteo-radar.actions';
import {MeteoRadarStatus} from '../../domain/model/meteo-radar-status';
import {MeteoRadarState} from './meteo-radar-state';


const initialState: MeteoRadarState = {
    status: MeteoRadarStatus.OFF,
    showLayer: false,
    availableRadarImages: [],
    selectedRadarImage: undefined,
    mapTilesUrl: ''
};


export const meteoRadarReducer = createReducer(
    initialState,

    on(MeteoRadarActions.open, (state) => ({
        ...state,
        status: MeteoRadarStatus.CURRENT,
        showLayer: true,
    })),

    on(MeteoRadarActions.close, (state) => ({
        ...state,
        status: MeteoRadarStatus.OFF,
        showLayer: false,
    })),

    on(MeteoRadarActions.previousStep, (state, action) => {
        const imageIdx = state.availableRadarImages.findIndex(img => img === state.selectedRadarImage);
        const selectedImage = imageIdx > 0
            ? state.availableRadarImages[imageIdx - 1]
            : state.availableRadarImages[0];

        return {
            ...state,
            selectedRadarImage: selectedImage
        };
    }),

    on(MeteoRadarActions.nextStep, (state, action) => {
        const imageIdx = state.availableRadarImages.findIndex(img => img === state.selectedRadarImage);
        const selectedImage = imageIdx < state.availableRadarImages.length - 1
            ? state.availableRadarImages[imageIdx + 1]
            : state.availableRadarImages[state.availableRadarImages.length - 1];

        return {
            ...state,
            selectedStep: selectedImage
        };
    }),

    on(MeteoRadarActions.selectStep, (state, action) => ({
        ...state,
        selectedStep: action.image,
    })),

    on(MeteoRadarActions.readAvailableRadarImagesSuccess, (state, action) => ({
        ...state,
        availableRadarImages: action.images
    })),

    on(MeteoRadarActions.readMapTilesUrlSuccess, (state, action) => ({
        ...state,
        mapTilesUrl: action.mapTilesUrl,
    })),
);
