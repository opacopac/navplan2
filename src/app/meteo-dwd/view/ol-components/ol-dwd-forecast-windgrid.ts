import {Observable, Subscription} from 'rxjs';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {ValueGrid} from '../../domain/model/value-grid';
import {WindSpeedDir} from '../../domain/model/wind-speed-dir';
import {ValueGridIterator} from '../../domain/model/value-grid-iterator';
import {OlDwdForecastWind} from './ol-dwd-forecast-wind';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';


export class OlDwdForecastWindgrid {
    private readonly windGridSubscription: Subscription;


    constructor(
        private readonly windLayer: OlVectorLayer,
        windGrid$: Observable<ValueGrid<WindSpeedDir>>
    ) {
        this.windGridSubscription = windGrid$.subscribe((windGrid) => {
            this.clearFeatures();
            this.drawFeatures(windGrid);
        });
    }


    public destroy() {
        this.windGridSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(windGrid: ValueGrid<WindSpeedDir>) {
        if (windGrid) {
            const iterator = new ValueGridIterator(windGrid);

            while (iterator.next()) {
                if (iterator.value) {
                    OlDwdForecastWind.draw(
                        iterator.value,
                        iterator.pos,
                        Angle.createZero(), // TODO
                        this.windLayer
                    );
                }
            }
        }
    }


    private clearFeatures() {
        this.windLayer.clear();
    }
}
