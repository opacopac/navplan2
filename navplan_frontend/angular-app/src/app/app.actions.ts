import {Action} from '@ngrx/store';


export enum AppActionTypes {
    APP_DUMMY = '[App] Dummy Action',
}


export class DummyAppAction implements Action {
    readonly type = AppActionTypes.APP_DUMMY;

    constructor() {}
}


export type AppActions =
    DummyAppAction;
