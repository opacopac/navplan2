import {createAction, props} from '@ngrx/store';
import {Position2d} from '../../geo-physics/domain-model/geometry/position2d';
import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';
import {Angle} from '../../geo-physics/domain-model/quantities/angle';
import {DataItem} from '../../common/model/data-item';
import {MapBaseLayerType} from '../../base-map/domain-model/map-base-layer-type';


export class BaseMapActions {
    public static readonly zoomIn = createAction(
        '[Base Map Buttons] zoom in'
    );

    public static readonly zoomOut = createAction(
        '[Base Map Buttons] zoom out'
    );

    public static readonly mapMoved = createAction(
        '[Base Map] map moved / zoomed / rotated',
        props<{ position: Position2d, zoom: number, rotation: Angle, extent: Extent2d }>()
    );

    public static readonly mapClicked = createAction(
        '[Base Map] map clicked',
        props<{ clickPos: Position2d, dataItem: DataItem, zoom: number }>()
    );

    public static readonly showImage = createAction(
        '[Base Map] show image',
        props<{ id: number, imageUrl: string, extent: Extent2d, opacity: number }>()
    );

    public static readonly closeImage = createAction(
        '[Base Map] close image',
        props<{ id: number }>()
    );

    public static readonly closeAllImages = createAction(
        '[Base Map] close all images',
    );

    public static readonly toggleMapBaseLayerSelection = createAction(
        '[Base Map] toggle map base layer selection',
    );

    public static readonly baseLayerSelected = createAction(
        '[Base Map] base map layer selected',
        props<{ mapBaseLayerType: MapBaseLayerType }>()
    );
}
