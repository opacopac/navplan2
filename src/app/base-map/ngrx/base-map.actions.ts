import {Action} from '@ngrx/store';
import {Position2d} from '../../geo-math/domain-model/geometry/position2d';
import {Extent2d} from '../../geo-math/domain-model/geometry/extent2d';
import {Angle} from '../../geo-math/domain-model/quantities/angle';
import {DataItem} from '../../shared/model/data-item';


export enum BaseMapActionTypes {
    BASE_MAP_ZOOM_IN = '[Base Map Buttons] zoom in',
    BASE_MAP_ZOOM_OUT = '[Base Map Buttons] zoom out',
    BASE_MAP_MOVED_ZOOMED_ROTATED = '[Base Map] map moved / zoomed / rotated',
    BASE_MAP_CLICKED = '[Base Map] map clicked',
    BASE_MAP_OVERLAY_CLOSE = '[Base Map] close overlay'
}


export class BaseMapZoomInAction implements Action {
    readonly type = BaseMapActionTypes.BASE_MAP_ZOOM_IN;

    constructor() {}
}


export class BaseMapZoomOutAction implements Action {
    readonly type = BaseMapActionTypes.BASE_MAP_ZOOM_OUT;

    constructor() {}
}


export class BaseMapMovedZoomedRotatedAction implements Action {
    readonly type = BaseMapActionTypes.BASE_MAP_MOVED_ZOOMED_ROTATED;

    constructor(
        public position: Position2d,
        public zoom: number,
        public rotation: Angle,
        public extent: Extent2d
    ) {}
}


export class BaseMapClickedAction implements Action {
    readonly type = BaseMapActionTypes.BASE_MAP_CLICKED;

    constructor(
        public clickPos: Position2d,
        public dataItem: DataItem
    ) {}
}


export class BaseMapOverlayCloseAction implements Action {
    readonly type = BaseMapActionTypes.BASE_MAP_OVERLAY_CLOSE;

    constructor() {}
}


export type BaseMapActions =
    BaseMapZoomInAction |
    BaseMapZoomOutAction |
    BaseMapMovedZoomedRotatedAction |
    BaseMapClickedAction |
    BaseMapOverlayCloseAction;
