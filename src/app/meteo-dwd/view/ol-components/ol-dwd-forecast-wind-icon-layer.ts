import {Observable, Subscription} from 'rxjs';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {WindInfo} from '../../domain/model/wind-info';
import {OlDwdForecastWindIcon} from './ol-dwd-forecast-wind-icon';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';


export class OlDwdForecastWindIconLayer {
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
                OlDwdForecastWindIcon.draw(
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
