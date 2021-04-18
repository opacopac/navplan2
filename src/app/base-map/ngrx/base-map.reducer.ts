import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {BaseMapState} from '../domain-model/base-map-state';
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

        case BaseMapActionTypes.BASE_MAP_CLICKED:
            return {
                ...state,
                showOverlay: { dataItem: action.dataItem, clickPos: action.clickPos }
            };

        case BaseMapActionTypes.BASE_MAP_OVERLAY_CLOSE:
            return {...state, showOverlay: { dataItem: undefined, clickPos: undefined }};

        default:
            return state;
    }
}
