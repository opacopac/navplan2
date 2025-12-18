import {OverlayState} from './overlay-state';
import {MeteoLayer} from '../../domain/model/meteo-layer';
import {CrosshairIcon} from '../../../aerodrome-charts/domain/model/crosshair-icon';
import {SidebarMode} from './sidebar-mode';


export interface FlightMapState {
    showMapOverlay: OverlayState;
    showNotamPopup: boolean;
    showTrafficPopup: boolean;
    showFullScreen: boolean;
    showMapLayerSelection: boolean;
    showMeteoLayer: boolean;
    meteoLayer: MeteoLayer;
    sidebarMode: SidebarMode;
    crosshairIcons: CrosshairIcon[];
}
