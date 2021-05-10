import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {BaseMapState} from './base-map-state';
import {Angle} from '../../common/geo-math/domain-model/quantities/angle';
import {BaseMapActions, BaseMapActionTypes} from './base-map.actions';
import {AngleUnit} from '../../common/geo-math/domain-model/quantities/units';
import {MapBaseLayerType} from '../domain-model/map-base-layer-type';


const initialState: BaseMapState = {
    position: new Position2d(7.4971, 46.9141),
    zoom: 11,
    rotation: new Angle(0, AngleUnit.RAD),
    extent: undefined,
    baseMapType: MapBaseLayerType.OPENTOPOMAP,
    showOverlay: { dataItem: undefined, clickPos: undefined },
    showImage: { imageId: undefined, imageUrl: undefined, extent: undefined, opacity: undefined }
};


export function baseMapReducer(state: BaseMapState = initialState, action: BaseMapActions) {
    switch (action.type) {
        case BaseMapActionTypes.BASE_MAP_MOVED_ZOOMED_ROTATED:
            return {
                ...state,
                position: action.position,
                zoom: action.zoom,
                rotation: action.rotation,
                extent: action.extent
            };

        case BaseMapActionTypes.BASE_MAP_ZOOM_IN:
            return  {
                ...state,
                zoom: state.zoom + 1 // TODO: limit
            };

        case BaseMapActionTypes.BASE_MAP_ZOOM_OUT:
            return  {
                ...state,
                zoom: state.zoom > 0 ? state.zoom - 1 : state.zoom
            };

        case BaseMapActionTypes.BASE_MAP_CLICKED:
            return {
                ...state,
                showOverlay: { dataItem: action.dataItem, clickPos: action.clickPos }
            };

        case BaseMapActionTypes.BASE_MAP_OVERLAY_CLOSE:
            return {...state, showOverlay: { dataItem: undefined, clickPos: undefined }};

        case BaseMapActionTypes.BASE_MAP_IMAGE_SHOW:
            return {
                ...state,
                showImage: { imageId: action.id, imageUrl: action.imageUrl, extent: action.extent, opacity: action.opacity }
            };

        case BaseMapActionTypes.BASE_MAP_IMAGE_CLOSE:
            return {
                ...state,
                showImage: { imageId: action.id, imageUrl: undefined, extent: undefined, opacity: undefined }
            };

        default:
            return state;
    }
}
