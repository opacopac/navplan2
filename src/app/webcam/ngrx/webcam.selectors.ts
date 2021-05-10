import {createFeatureSelector} from '@ngrx/store';
import {WebcamState} from './webcam-state';


export const getWebcamState = createFeatureSelector<WebcamState>('webcamState');
