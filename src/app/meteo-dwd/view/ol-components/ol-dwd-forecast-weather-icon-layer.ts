import {Observable, Subscription} from 'rxjs';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {ValueGrid} from '../../domain/model/value-grid';
import {ValueGridIterator} from '../../domain/model/value-grid-iterator';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {WwValue} from '../../domain/model/ww-value';
import {OlDwdForecastWeatherIcon} from './ol-dwd-forecast-weather-icon';


export class OlDwdForecastWeatherIconLayer {
    private readonly weatherGridSubscription: Subscription;


    constructor(
        private readonly weatherLayer: OlVectorLayer,
        windGrid$: Observable<ValueGrid<WwValue>>
    ) {
        this.weatherGridSubscription = windGrid$.subscribe((wwGrid) => {
            this.clearFeatures();
            this.drawFeatures(wwGrid);
        });
    }


    public destroy() {
        this.weatherGridSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(wwGrid: ValueGrid<WwValue>) {
        if (wwGrid) {
            const iterator = new ValueGridIterator(wwGrid);

            while (iterator.next()) {
                if (iterator.value) {
                    OlDwdForecastWeatherIcon.draw(
                        iterator.value,
                        iterator.pos,
                        Angle.createZero(), // TODO
                        this.weatherLayer
                    );
                }
            }
        }
    }


    private clearFeatures() {
        this.weatherLayer.clear();
    }
}
