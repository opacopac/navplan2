import {Observable} from 'rxjs/internal/Observable';
import {RadarImage} from '../model/radar-image';


export abstract class IMeteoRadarImageService {
    public abstract readAvailableRadarImages(): Observable<RadarImage[]>;

    public abstract getRadarImageMapTilesUrl(radarImage: RadarImage): string;
}
