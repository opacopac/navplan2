import {Action} from '@ngrx/store';
import {Position2d} from '../../shared/model/geometry/position2d';
import {Extent2d} from '../../shared/model/geometry/extent2d';
import {Angle} from '../../shared/model/quantities/angle';
import {DataItem} from '../../shared/model/data-item';


export enum OlMapActionTypes {
    OL_MAP_ZOOM_IN = '[OpenLayers Map Buttons] zoom in',
    OL_MAP_ZOOM_OUT = '[OpenLayers Map Buttons] zoom out',
    OL_MAP_MOVED_ZOOMED_ROTATED = '[OpenLayers Map] map moved / zoomed / rotated',
    OL_MAP_CLICKED = '[OpenLayers Map] map clicked',
    OL_MAP_OVERLAY_CLOSE = '[OpenLayers Map] close overlay'
}


export class OlMapZoomInAction implements Action {
    readonly type = OlMapActionTypes.OL_MAP_ZOOM_IN;

    constructor() {}
}


export class OlMapZoomOutAction implements Action {
    readonly type = OlMapActionTypes.OL_MAP_ZOOM_OUT;

    constructor() {}
}


export class OlMapMovedZoomedRotatedAction implements Action {
    readonly type = OlMapActionTypes.OL_MAP_MOVED_ZOOMED_ROTATED;

    constructor(
        public position: Position2d,
        public zoom: number,
        public rotation: Angle,
        public extent: Extent2d) {}
}


export class OlMapClickedAction implements Action {
    readonly type = OlMapActionTypes.OL_MAP_CLICKED;

    constructor(
        public clickPos: Position2d,
        public dataItem: DataItem) {}
}


export class OlMapOverlayCloseAction implements Action {
    readonly type = OlMapActionTypes.OL_MAP_OVERLAY_CLOSE;

    constructor() {}
}


export type OlMapActions =
    OlMapZoomInAction |
    OlMapZoomOutAction |
    OlMapMovedZoomedRotatedAction |
    OlMapClickedAction |
    OlMapOverlayCloseAction;
