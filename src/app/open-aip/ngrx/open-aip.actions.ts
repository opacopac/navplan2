import {Action} from '@ngrx/store';
import {Extent2d} from '../../shared/model/geometry/extent2d';
import {OpenAipItems} from '../domain/open-aip-items';
import {User} from '../../user/domain/user';


export enum OpenAIpActionTypes {
    OPEN_AIP_LOAD_ITEMS = '[Map zoomed/moved/rotated Action] load openAIP items',
    OPEN_AIP_LOAD_ITEMS_SUCCESS = '[openAIP service] load openAIP items success',
    OPEN_AIP_LOAD_ITEMS_ERROR = '[openAIP service] load openAIP items error',
}


export class LoadOpenAipItemsAction implements Action {
    readonly type = OpenAIpActionTypes.OPEN_AIP_LOAD_ITEMS;

    constructor(public extent: Extent2d, public zoom: number) {}
}


export class LoadOpenAIpItemsSuccessAction implements Action {
    readonly type = OpenAIpActionTypes.OPEN_AIP_LOAD_ITEMS_SUCCESS;

    constructor(public openAipItems: OpenAipItems, public extent: Extent2d, public zoom: number, user: User) {}
}


export class LoadOpenAipItemsErrorAction implements Action {
    readonly type = OpenAIpActionTypes.OPEN_AIP_LOAD_ITEMS_ERROR;

    constructor(public error: Error) {}
}


export type OpenAipActions =
    LoadOpenAipItemsAction |
    LoadOpenAIpItemsSuccessAction |
    LoadOpenAipItemsErrorAction;
