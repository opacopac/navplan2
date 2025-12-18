import {FlightMapState} from './flight-map-state';
import {FlightMapActions} from './flight-map.actions';
import {createReducer, on} from '@ngrx/store';
import {WaypointConverter} from '../../../flightroute/domain/converter/waypoint-converter';
import {MeteoLayer} from '../../domain/model/meteo-layer';
import {SidebarMode} from './sidebar-mode';


const initialState: FlightMapState = {
    showMapOverlay: {
        dataItem: undefined,
        waypoint: undefined,
        clickPos: undefined,
        metarTaf: undefined,
        notams: [],
        tabIndex: 0
    },
    showNotamPopup: false,
    showTrafficPopup: false,
    showFullScreen: false,
    showMapLayerSelection: false,
    showMeteoLayer: false,
    meteoLayer: MeteoLayer.SmaStationsLayer,
    sidebarMode: SidebarMode.OFF,
    crosshairIcons: []
};


export const flightMapReducer = createReducer(
    initialState,
    on(FlightMapActions.showOverlaySuccess, (state, action) => ({
        ...state,
        showMapOverlay: {
            dataItem: action.dataItem,
            waypoint: action.waypoints?.length > 0
                ? action.waypoints[0] // TODO: handle multiple waypoints
                : WaypointConverter.createWaypointFromDataItem(action.dataItem, action.clickPos),
            clickPos: action.clickPos,
            metarTaf: action.metarTaf,
            notams: action.notams,
            tabIndex: action.tabIndex
        }
    })),
    on(FlightMapActions.hideOverlay, (state) => ({
        ...state,
        showMapOverlay: initialState.showMapOverlay
    })),
    on(FlightMapActions.toggleFullScreen, (state) => ({
        ...state,
        showFullScreen: !state.showFullScreen
    })),
    on(FlightMapActions.toggleMapLayerSelection, (state, action) => ({
        ...state,
        showMapLayerSelection: !state.showMapLayerSelection
    })),
    on(FlightMapActions.toggleMeteoLayer, (state) => ({
        ...state,
        showMeteoLayer: !state.showMeteoLayer
    })),
    on(FlightMapActions.selectMeteoLayer, (state, action) => ({
        ...state,
        meteoLayer: action.meteoLayer
    })),
    on(FlightMapActions.showUploadChartSidebar, (state, action) => ({
        ...state,
        showMapOverlay: initialState.showMapOverlay,
        sidebarMode: SidebarMode.UPLOAD_AD_CHART,
    })),
    on(FlightMapActions.hideSidebar, (state) => ({
        ...state,
        sidebarMode: SidebarMode.OFF
    })),
    on(FlightMapActions.setCrosshairIcons, (state, action) => ({
        ...state,
        crosshairIcons: action.icons
    })),
    on(FlightMapActions.showNotamPopup, (state) => ({
        ...state,
        showNotamPopup: true
    })),
    on(FlightMapActions.hideNotamPopup, (state) => ({
        ...state,
        showNotamPopup: false
    })),
    on(FlightMapActions.showTrafficPopup, (state) => ({
        ...state,
        showTrafficPopup: true
    })),
    on(FlightMapActions.hideTrafficPopup, (state) => ({
        ...state,
        showTrafficPopup: false
    }))
);
