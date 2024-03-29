import {createReducer, on} from '@ngrx/store';
import {WebcamState} from '../state-model/webcam-state';
import {WebcamActions} from './webcam.actions';


const initialState: WebcamState = {
    extent: undefined,
    zoom: undefined,
    webcams: [],
};


export const webcamReducer = createReducer(
    initialState,
    on(WebcamActions.readSuccess, (state, action) => ({
        ...state,
        extent: action.extent,
        zoom: action.zoom,
        webcams: action.webcams
    })),
);
