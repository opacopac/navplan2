import {OverlayState} from './overlay-state';
import {MeteoLayer} from '../../domain/model/meteo-layer';


export interface FlightMapState {
    showMapOverlay: OverlayState;
    showMeteoLayer: boolean;
    meteoLayer: MeteoLayer;
}
