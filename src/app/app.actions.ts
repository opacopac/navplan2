import {Action} from '@ngrx/store';


export enum AppActionTypes {
    APP_DUMMY_ACTION = '[DUMMY] action',
}


export class AppDummyAction implements Action {
    readonly type = AppActionTypes.APP_DUMMY_ACTION;

    constructor() {}
}


export type AppActions =
    AppDummyAction;
