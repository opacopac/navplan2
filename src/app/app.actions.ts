import {Action} from '@ngrx/store';
import {ActiveMapType} from './app-state';


export enum AppActionTypes {
    APP_SELECT_ACTIVE_MAP = '[Router] Select active map',
}


export class SelectActiveMapAction implements Action {
    readonly type = AppActionTypes.APP_SELECT_ACTIVE_MAP;

    constructor(public activeMap: ActiveMapType) {}
}


export type AppActions =
    SelectActiveMapAction;
