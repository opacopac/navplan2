import {Observable, Subscription} from 'rxjs';
import {OlSmaWindArrow} from './ol-sma-wind-arrow';
import {OlVectorLayer} from '../../base-map/ol-model/ol-vector-layer';
import {SmaMeasurement} from '../domain-model/sma-measurement';
import {Angle} from '../../common/geo-math/domain-model/quantities/angle';
import {OlSmaMeasurementGreyBg} from './ol-sma-measurement-grey-bg';
import {MeteoSmaState} from '../domain-model/meteo-sma-state';
import {OlSmaMeasurementDetailBox} from './ol-sma-measurement-detail-box';
import {MeteoSmaButtonStatus} from '../domain-model/meteo-sma-button-status';


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

            if (state.buttonStatus === MeteoSmaButtonStatus.CURRENT) {
                this.drawFeatures(state.smaMeasurements, mapRotation);
            }
        });
    }


    public destroy() {
        this.meteoSmaStateSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(smaMeasurements: SmaMeasurement[], mapRotation: Angle) {
        // background
        OlSmaMeasurementGreyBg.draw(this.smaMeasurementsBgLayer);

        // measurements
        if (smaMeasurements) {
            smaMeasurements.forEach(smaMeasurement => {
                OlSmaMeasurementDetailBox.draw(smaMeasurement, this.smaMeasurementsLayer, mapRotation);
                // OlSmaMeasurementSmallBox.draw(smaMeasurement, this.smaMeasurementsLayer);
                OlSmaWindArrow.draw(smaMeasurement, this.smaMeasurementsLayer, mapRotation);
            });
        }
    }


    private clearFeatures() {
        this.smaMeasurementsBgLayer.clear();
        this.smaMeasurementsLayer.clear();
    }
}
