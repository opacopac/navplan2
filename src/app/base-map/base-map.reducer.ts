import {Position2d} from '../shared/model/geometry/position2d';
import {BaseMapState} from './base-map-state';
import {Angle} from '../shared/model/quantities/angle';
import {BaseMapActions, MapActionTypes} from './base-map.actions';
import {AngleUnit} from '../shared/model/units';
import {MapbaselayerType} from './model/mapbaselayer-factory';


const initialState: BaseMapState = {
    position: new Position2d(7.4971, 46.9141),
    zoom: 11,
    rotation: new Angle(0, AngleUnit.RAD),
    extent: undefined,
    baseMapType: MapbaselayerType.OPENTOPOMAP,
    showOverlay: { dataItem: undefined, clickPos: undefined },
};


export function baseMapReducer(state: BaseMapState = initialState, action: BaseMapActions) {
    switch (action.type) {
        case MapActionTypes.MAP_MOVED_ZOOMED_ROTATED:
            return { ...state,
                position: action.position,
                zoom: action.zoom,
                rotation: action.rotation,
                extent: action.extent };

        case MapActionTypes.MAP_CLICKED:
            return { ...state,
                showOverlay: {
                    dataItem: action.dataItem,
                    clickPos: action.clickPos
                }
            };

        case MapActionTypes.MAP_OVERLAY_CLOSE:
            return { ...state,
                showOverlay: { dataItem: undefined, clickPos: undefined }
            };

        default:
            return state;
    }
}
