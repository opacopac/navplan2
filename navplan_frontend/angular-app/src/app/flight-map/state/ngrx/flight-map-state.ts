import {OverlayState} from './overlay-state';
import {MeteoLayer} from '../../domain/model/meteo-layer';
import {SidebarState} from './sidebar-state';
import {CrosshairIcon} from '../../../aerodrome-charts/domain/model/crosshair-icon';


export interface FlightMapState {
    showMapOverlay: OverlayState;
    showFullScreen: boolean;
    showMapLayerSelection: boolean;
    showMeteoLayer: boolean;
    meteoLayer: MeteoLayer;
    sidebarState: SidebarState;
    crosshairIcons: CrosshairIcon[];
}
