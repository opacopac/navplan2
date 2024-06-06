import {OverlayState} from './overlay-state';
import {MeteoLayer} from '../../domain/model/meteo-layer';


export interface FlightMapState {
    showMapOverlay: OverlayState;
    showFullScreen: boolean;
    showMapLayerSelection: boolean;
    showMeteoLayer: boolean;
    meteoLayer: MeteoLayer;
}
