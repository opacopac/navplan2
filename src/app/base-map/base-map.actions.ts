import {Action} from '@ngrx/store';
import {Position2d} from '../shared/model/geometry/position2d';
import {Extent} from '../shared/model/extent';
import {Angle} from '../shared/model/quantities/angle';
import {DataItem} from '../shared/model/data-item';


export enum BaseMapActionTypes {
    BASEMAP_ZOOM_IN = '[Base Map Buttons] zoom in',
    BASEMAP_ZOOM_OUT = '[Base Map Buttons] zoom out',
    BASEMAP_MOVED_ZOOMED_ROTATED = '[Base Map] map moved / zoomed / rotated',
    BASEMAP_CLICKED = '[Base Map] map clicked',
    BASEMAP_OVERLAY_CLOSE = '[Base Map] close overlay'
}


export class BaseMapZoomInAction implements Action {
    readonly type = BaseMapActionTypes.BASEMAP_ZOOM_IN;

    constructor() {}
}


export class BaseMapZoomOutAction implements Action {
    readonly type = BaseMapActionTypes.BASEMAP_ZOOM_OUT;

    constructor() {}
}


export class BaseMapMovedZoomedRotatedAction implements Action {
    readonly type = BaseMapActionTypes.BASEMAP_MOVED_ZOOMED_ROTATED;

    constructor(
        public position: Position2d,
        public zoom: number,
        public rotation: Angle,
        public extent: Extent) {}
}


export class BaseMapClickedAction implements Action {
    readonly type = BaseMapActionTypes.BASEMAP_CLICKED;

    constructor(
        public clickPos: Position2d,
        public dataItem: DataItem) {}
}


export class BaseMapOverlayCloseAction implements Action {
    readonly type = BaseMapActionTypes.BASEMAP_OVERLAY_CLOSE;

    constructor() {}
}


export type BaseMapActions =
    BaseMapZoomInAction |
    BaseMapZoomOutAction |
    BaseMapMovedZoomedRotatedAction |
    BaseMapClickedAction |
    BaseMapOverlayCloseAction;
