import {Selector} from '@ngrx/store';
import {CoreState} from './core-state';
import {AppState} from '../app-state';


export const getCoreState: Selector<AppState, CoreState> = (state) => state.coreState;
