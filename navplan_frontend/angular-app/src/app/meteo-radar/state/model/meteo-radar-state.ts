import {RadarImage} from '../../domain/model/radar-image';
import {MeteoRadarStatus} from '../../domain/model/meteo-radar-status';


export interface MeteoRadarState {
    status: MeteoRadarStatus;
    showLayer: boolean;
    availableRadarImages: RadarImage[];
    selectedRadarImage: RadarImage;
    mapTilesUrl: string;
}
