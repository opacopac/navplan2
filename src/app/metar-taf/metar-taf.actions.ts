import {Action} from '@ngrx/store';
import {Extent2d} from '../shared/model/extent2d';
import {MetarTafList} from './model/metar-taf';


export enum MetarTafActionTypes {
    METARTAF_LOAD_SUCCESS = '[MetarTafService] Load METAR/TAF success',
    METARTAF_LOAD_ERROR = '[MetarTafService] Load METAR/TAF error',
}


export class LoadMetarTafSuccessAction implements Action {
    readonly type = MetarTafActionTypes.METARTAF_LOAD_SUCCESS;

    constructor(
        public metarTafList: MetarTafList,
        public extent: Extent2d,
        public zoom: number) {}
}


export class LoadMetarTafErrorAction implements Action {
    readonly type = MetarTafActionTypes.METARTAF_LOAD_ERROR;

    constructor(public error: Error) {}
}


export type MetarTafActions =
    LoadMetarTafSuccessAction |
    LoadMetarTafErrorAction;
