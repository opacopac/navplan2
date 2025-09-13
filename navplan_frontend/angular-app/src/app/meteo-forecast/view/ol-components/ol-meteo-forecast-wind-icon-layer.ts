import {Observable, Subscription} from 'rxjs';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {WindInfo} from '../../domain/model/wind-info';
import {OlMeteoForecastWindIcon} from './ol-meteo-forecast-wind-icon';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';


export class OlMeteoForecastWindIconLayer {
    private readonly windGridSubscription: Subscription;


    constructor(
        private readonly windLayer: OlVectorLayer,
        windValues$: Observable<WindInfo[]>
    ) {
        this.windGridSubscription = windValues$.subscribe((windGrid) => {
            this.clearFeatures();
            this.drawFeatures(windGrid);
        });
    }


    public destroy() {
        this.windGridSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(windValues: WindInfo[]) {
        if (windValues) {
            windValues.forEach(windInfo => {
                OlMeteoForecastWindIcon.draw(
                    windInfo,
                    windInfo.pos,
                    Angle.createZero(), // TODO
                    this.windLayer
                );
            })
        }
    }


    private clearFeatures() {
        this.windLayer.clear();
    }
}
