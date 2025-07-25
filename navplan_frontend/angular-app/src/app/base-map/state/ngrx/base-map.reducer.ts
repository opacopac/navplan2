import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {BaseMapState} from '../state-model/base-map-state';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {BaseMapActions} from './base-map.actions';
import {MapBaseLayerType} from '../../domain/model/map-base-layer-type';
import {createReducer, on} from '@ngrx/store';
import {AngleUnit} from '../../../geo-physics/domain/model/quantities/angle-unit';
import {CursorMode} from '../state-model/cursor-mode';


const initialState: BaseMapState = {
    position: new Position2d(7.4971, 46.9141),
    zoom: 11,
    rotation: new Angle(0, AngleUnit.RAD),
    extent: undefined,
    widthPx: undefined,
    heightPx: undefined,
    baseMapType: MapBaseLayerType.OPENTOPOMAP,
    showImage: {imageId: undefined, imageUrl: undefined, extent: undefined, opacity: undefined, fitInView: true},
    showAttributions: false,
    cursorMode: CursorMode.DEFAULT
};


export const baseMapReducer = createReducer(
    initialState,

    on(BaseMapActions.zoomIn, (state) => ({
        ...state,
        zoom: state.zoom + 1 // TODO: limit
    })),

    on(BaseMapActions.zoomOut, (state) => ({
        ...state,
        zoom: state.zoom > 0 ? state.zoom - 1 : state.zoom
    })),

    on(BaseMapActions.setMapPosition, (state, action) => ({
        ...state,
        position: action.position,
        zoom: action.zoom ? action.zoom : state.zoom
    })),

    on(BaseMapActions.mapMoved, (state, action) => ({
        ...state,
        position: action.position,
        zoom: action.zoom,
        rotation: action.rotation,
        extent: action.extent,
        widthPx: action.widthPx,
        heightPx: action.heightPx
    })),

    on(BaseMapActions.showImage, (state, action) => ({
        ...state,
        showImage: {
            imageId: action.id,
            imageUrl: action.imageUrl,
            extent: action.extent,
            opacity: action.opacity,
            fitInView: true
        }
    })),

    on(BaseMapActions.closeImage, (state, action) => ({
        ...state,
        showImage: {
            imageId: action.id,
            imageUrl: undefined,
            extent: undefined,
            opacity: undefined,
            fitInView: true
        }
    })),

    on(BaseMapActions.closeAllImages, (state, action) => ({
        ...state,
        showImage: {
            imageId: undefined,
            imageUrl: undefined,
            extent: undefined,
            opacity: undefined,
            fitInView: true
        }
    })),

    on(BaseMapActions.toggleAttributions, (state, action) => ({
        ...state,
        showAttributions: !state.showAttributions
    })),

    on(BaseMapActions.baseLayerSelected, (state, action) => ({
        ...state,
        baseMapType: action.mapBaseLayerType
    })),

    on(BaseMapActions.setCursorMode, (state, action) => ({
        ...state,
        cursorMode: action.cursorMode
    }))
);
