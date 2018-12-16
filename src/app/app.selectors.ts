import {createSelector} from '@ngrx/store';
import {AppState} from './app-state';


export const getAppState = (appState: AppState) => appState;
export const getActiveMap = createSelector(getAppState, state => state.activeMap);
