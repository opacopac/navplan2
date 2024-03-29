import {Observable, Subscription} from 'rxjs';
import {OlSmaWindArrow} from './ol-sma-wind-arrow';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {OlSmaMeasurementGreyBg} from './ol-sma-measurement-grey-bg';
import {MeteoSmaState} from '../../domain/model/meteo-sma-state';
import {OlSmaMeasurementDetailBox} from './ol-sma-measurement-detail-box';
import {MeteoSmaStatus} from '../../domain/model/meteo-sma-status';
import {OlSmaMeasurementSmallBox} from './ol-sma-measurement-small-box';


export class OlSmaMeasurementContainer {
    private readonly meteoSmaStateSubscription: Subscription;


    constructor(
        private readonly smaMeasurementsBgLayer: OlVectorLayer,
        private readonly smaMeasurementsLayer: OlVectorLayer,
        private readonly meteoSmaState$: Observable<MeteoSmaState>,
        mapRotation: Angle
    ) {
        this.meteoSmaStateSubscription = this.meteoSmaState$.subscribe(state => {
            this.clearFeatures();

            if (state.status === MeteoSmaStatus.CURRENT) {
                this.drawFeatures(state, mapRotation);
            }
        });
    }


    public destroy() {
        this.meteoSmaStateSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(state: MeteoSmaState, mapRotation: Angle) {
        // background
        OlSmaMeasurementGreyBg.draw(this.smaMeasurementsBgLayer);

        // measurements
        if (state.smaMeasurements) {
            state.smaMeasurements.forEach(smaMeasurement => {
                if (state.zoom <= 10) {
                    OlSmaMeasurementSmallBox.draw(smaMeasurement, this.smaMeasurementsLayer);
                } else {
                    OlSmaMeasurementDetailBox.draw(smaMeasurement, this.smaMeasurementsLayer, mapRotation);
                }

                OlSmaWindArrow.draw(smaMeasurement, this.smaMeasurementsLayer, mapRotation);
            });
        }
    }


    private clearFeatures() {
        this.smaMeasurementsBgLayer.clear();
        this.smaMeasurementsLayer.clear();
    }
}
