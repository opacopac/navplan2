import {Action} from '@ngrx/store';


export enum MapActionTypes {
    MAP_UPDATE_POSITION_ZOOM = '[Map page] update position/zoom'
}


export class MapUpdatePositionZoomAction implements Action {
    readonly type = MapActionTypes.MAP_UPDATE_POSITION_ZOOM;

    constructor(
        public email: string,
        public token: string) {}
}


export type MapActions =
    MapUpdatePositionZoomAction;
