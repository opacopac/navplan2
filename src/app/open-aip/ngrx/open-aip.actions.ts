import {Action} from '@ngrx/store';
import {ReadOpenAipItemsByExtentResult} from '../domain/read-open-aip-items-by-extent-result';
import {Extent2d} from '../../geo-math/domain/geometry/extent2d';


export enum OpenAipActionTypes {
    OPEN_AIP_READ_ITEMS = '[navMapEffects] read openAIP items',
    OPEN_AIP_READ_ITEMS_SUCCESS = '[openAipEffects] read openAIP items success',
    OPEN_AIP_READ_ITEMS_ERROR = '[openAipEffects] read openAIP items error',
}


export class ReadOpenAipItemsAction implements Action {
    readonly type = OpenAipActionTypes.OPEN_AIP_READ_ITEMS;

    constructor(
        public extent: Extent2d,
        public zoom: number
    ) {}
}


export class ReadOpenAipItemsSuccessAction implements Action {
    readonly type = OpenAipActionTypes.OPEN_AIP_READ_ITEMS_SUCCESS;

    constructor(public result: ReadOpenAipItemsByExtentResult) {}
}


export class ReadOpenAipItemsErrorAction implements Action {
    readonly type = OpenAipActionTypes.OPEN_AIP_READ_ITEMS_ERROR;

    constructor(public error: Error) {}
}


export type OpenAipActions =
    ReadOpenAipItemsAction |
    ReadOpenAipItemsSuccessAction |
    ReadOpenAipItemsErrorAction;
