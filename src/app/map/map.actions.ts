import {Action} from '@ngrx/store';
import {Position2d} from '../shared/model/geometry/position2d';
import {Extent} from '../shared/model/extent';
import {Angle} from '../shared/model/quantities/angle';
import {DataItem} from '../shared/model/data-item';


export enum MapActionTypes {
    MAP_MOVED_ZOOMED_ROTATED = '[Map] map moved / zoomed / rotated',
    MAP_FEATURE_CLICKED = '[Map] map feature clicked',
    MAP_BACKGROUND_CLICKED = '[Map] map background clicked',
}


export class MapMovedZoomedRotatedAction implements Action {
    readonly type = MapActionTypes.MAP_MOVED_ZOOMED_ROTATED;

    constructor(
        public position: Position2d,
        public zoom: number,
        public rotation: Angle,
        public extent: Extent) {}
}


export class MapFeatureClickedAction implements Action {
    readonly type = MapActionTypes.MAP_FEATURE_CLICKED;

    constructor(
        public mapFeature: DataItem,
        public clickPos: Position2d) {}
}


export class MapBackgroundClickedAction implements Action {
    readonly type = MapActionTypes.MAP_BACKGROUND_CLICKED;

    constructor(public clickPos: Position2d) {}
}


export type MapActions =
    MapMovedZoomedRotatedAction |
    MapFeatureClickedAction |
    MapBackgroundClickedAction;
