import {Position2d} from '../../geo-math/domain/geometry/position2d';
import {OlMapState} from '../domain/ol-map-state';
import {Angle} from '../../geo-math/domain/quantities/angle';
import {OlMapActions, OlMapActionTypes} from './ol-map.actions';
import {AngleUnit} from '../../geo-math/domain/quantities/units';
import {MapbaselayerType} from '../domain/ol-baselayer-factory';


const initialState: OlMapState = {
    position: new Position2d(7.4971, 46.9141),
    zoom: 11,
    rotation: new Angle(0, AngleUnit.RAD),
    extent: undefined,
    baseMapType: MapbaselayerType.OPENTOPOMAP,
    showOverlay: { dataItem: undefined, clickPos: undefined },
};


export function olMapReducer(state: OlMapState = initialState, action: OlMapActions) {
    switch (action.type) {
        case OlMapActionTypes.OL_MAP_MOVED_ZOOMED_ROTATED:
            return {
                ...state,
                position: action.position,
                zoom: action.zoom,
                rotation: action.rotation,
                extent: action.extent
            };

        case OlMapActionTypes.OL_MAP_CLICKED:
            return {
                ...state,
                showOverlay: { dataItem: action.dataItem, clickPos: action.clickPos }
            };

        case OlMapActionTypes.OL_MAP_OVERLAY_CLOSE:
            return {...state, showOverlay: { dataItem: undefined, clickPos: undefined }};

        default:
            return state;
    }
}
