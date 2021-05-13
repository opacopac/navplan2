import {createAction, props} from '@ngrx/store';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Angle} from '../../common/geo-math/domain-model/quantities/angle';
import {DataItem} from '../../common/model/data-item';


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
        props<{ clickPos: Position2d, dataItem: DataItem }>()
    );
    public static readonly closeOverlay = createAction(
        '[Base Map] close overlay'
    );
    public static readonly showImage = createAction(
        '[Base Map] show image',
        props<{ id: number, imageUrl: string, extent: Extent2d, opacity: number }>()
    );
    public static readonly closeImage = createAction(
        '[Base Map] close image',
        props<{ id: number }>()
    );
}
