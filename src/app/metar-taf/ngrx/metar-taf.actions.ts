import {Action} from '@ngrx/store';
import {Extent2d} from '../../geo-math/domain/geometry/extent2d';
import {ReadMetarTafByExtentResult} from '../domain/read-metar-taf-by-extent-result';


export enum MetarTafActionTypes {
    METARTAF_READ = '[NavMapEffects] Read METAR/TAF success',
    METARTAF_READ_SUCCESS = '[MetarTafEffects] Read METAR/TAF success',
    METARTAF_READ_ERROR = '[MetarTafEffects] Read METAR/TAF error',
}


export class ReadMetarTafAction implements Action {
    readonly type = MetarTafActionTypes.METARTAF_READ;

    constructor(
        public extent: Extent2d,
        public zoom: number
    ) {}
}


export class ReadMetarTafSuccessAction implements Action {
    readonly type = MetarTafActionTypes.METARTAF_READ_SUCCESS;

    constructor(public result: ReadMetarTafByExtentResult) {}
}


export class ReadMetarTafErrorAction implements Action {
    readonly type = MetarTafActionTypes.METARTAF_READ_ERROR;

    constructor(public error: Error) {}
}


export type MetarTafActions =
    ReadMetarTafAction |
    ReadMetarTafSuccessAction |
    ReadMetarTafErrorAction;
