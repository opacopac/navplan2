import {Action} from '@ngrx/store';


export enum NavMapActionTypes {
    NAV_MAP_ACTIVATE = '[AppEffects] activate navigation map',
}


export class NavMapActivateAction implements Action {
    readonly type = NavMapActionTypes.NAV_MAP_ACTIVATE;

    constructor(public isActive: boolean) {}
}


export type NavMapActions =
    NavMapActivateAction;
