import {createFeatureSelector, createSelector} from '@ngrx/store';
import {WebcamState} from '../domain-model/webcam-state';


export const getWebcamState = createFeatureSelector<WebcamState>('webcamState');
export const getWebcams = createSelector(getWebcamState, state => state.webcams);
