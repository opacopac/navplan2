import {Observable, Subscription} from 'rxjs';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {ValueGrid} from '../../domain/model/value-grid';
import {WindInfo} from '../../domain/model/wind-info';
import {ValueGridIterator} from '../../domain/model/value-grid-iterator';
import {OlDwdForecastWindIcon} from './ol-dwd-forecast-wind-icon';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';


export class OlDwdForecastWindIconLayer {
    private readonly windGridSubscription: Subscription;


    constructor(
        private readonly windLayer: OlVectorLayer,
        windGrid$: Observable<ValueGrid<WindInfo>>
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


    private drawFeatures(windGrid: ValueGrid<WindInfo>) {
        if (windGrid) {
            const iterator = new ValueGridIterator(windGrid);

            while (iterator.next()) {
                if (iterator.value) {
                    OlDwdForecastWindIcon.draw(
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
