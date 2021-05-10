import {WebcamState} from './webcam-state';
import {WebcamActions} from './webcam-actions';


const initialState: WebcamState = {
    dummy: undefined
};


export function webcamReducer(state: WebcamState = initialState, action: WebcamActions) {
    switch (action.type) {
        default:
            return state;
    }
}
