import {Action} from '@ngrx/store';
import {Extent2d} from '../shared/model/geometry/extent2d';
import {OpenAipItems} from './domain/open-aip-items';
import {User} from '../user/domain/user';


export enum MapFeaturesActionTypes {
    MAPFEATURES_LOAD = '[Map zoomed/moved/rotated Action] load map features',
    MAPFEATURES_LOAD_SUCCESS = '[MapFeatures service] load map features success',
    MAPFEATURES_LOAD_ERROR = '[MapFeatures service] load map features error',
}


export class LoadMapFeaturesAction implements Action {
    readonly type = MapFeaturesActionTypes.MAPFEATURES_LOAD;

    constructor(public extent: Extent2d, public zoom: number) {}
}


export class LoadMapFeaturesSuccessAction implements Action {
    readonly type = MapFeaturesActionTypes.MAPFEATURES_LOAD_SUCCESS;

    constructor(public mapFeatures: OpenAipItems, public extent: Extent2d, public zoom: number, user: User) {}
}


export class LoadMapFeaturesErrorAction implements Action {
    readonly type = MapFeaturesActionTypes.MAPFEATURES_LOAD_ERROR;

    constructor(public error: Error) {}
}


export type MapFeaturesActions =
    LoadMapFeaturesAction |
    LoadMapFeaturesSuccessAction |
    LoadMapFeaturesErrorAction;
