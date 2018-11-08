import {Action} from '@ngrx/store';
import {Position2d} from '../shared/model/geometry/position2d';
import {Extent} from '../shared/model/extent';
import {Angle} from '../shared/model/quantities/angle';
import {DataItem} from '../shared/model/data-item';


export enum MapActionTypes {
    MAP_ZOOM_IN = '[Map buttons] zoom in',
    MAP_ZOOM_OUT = '[Map buttons] zoom out',
    MAP_MOVED_ZOOMED_ROTATED = '[Map] map moved / zoomed / rotated',
    MAP_CLICKED = '[Map] map clicked',
    MAP_OVERLAY_CLOSE = '[Map] close overlay'
}


export class MapZoomInAction implements Action {
    readonly type = MapActionTypes.MAP_ZOOM_IN;

    constructor() {}
}


export class MapZoomOutAction implements Action {
    readonly type = MapActionTypes.MAP_ZOOM_OUT;

    constructor() {}
}


export class MapMovedZoomedRotatedAction implements Action {
    readonly type = MapActionTypes.MAP_MOVED_ZOOMED_ROTATED;

    constructor(
        public position: Position2d,
        public zoom: number,
        public rotation: Angle,
        public extent: Extent) {}
}


export class MapClickedAction implements Action {
    readonly type = MapActionTypes.MAP_CLICKED;

    constructor(
        public clickPos: Position2d,
        public dataItem: DataItem) {}
}


export class MapOverlayCloseAction implements Action {
    readonly type = MapActionTypes.MAP_OVERLAY_CLOSE;

    constructor() {}
}


export type BaseMapActions =
    MapZoomInAction |
    MapZoomOutAction |
    MapMovedZoomedRotatedAction |
    MapClickedAction |
    MapOverlayCloseAction;
