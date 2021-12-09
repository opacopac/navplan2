import {Icon, Style} from 'ol/style';
import {SmaMeasurement} from '../../meteo-sma/domain-model/sma-measurement';
import {OlVectorLayer} from '../../base-map/ol-model/ol-vector-layer';
import {OlFeature} from '../../base-map/ol-model/ol-feature';
import {OlGeometry} from '../../base-map/ol-model/ol-geometry';
import {OlSmaMeasurementHelper} from './ol-sma-measurement-helper';


export class OlSmaMeasurementSmallBox {
    public static draw(
        smaMeasurement: SmaMeasurement,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(smaMeasurement, true);
        olFeature.setStyle(this.createPointStyle(smaMeasurement));
        olFeature.setGeometry(OlGeometry.fromPoint(smaMeasurement.station.position));
        layer.addFeature(olFeature);
    }


    private static createPointStyle(smaMeasurement: SmaMeasurement): Style {
        const smallBoxImage = this.getSmallBoxImage(smaMeasurement);
        const displayScale = 1 / (window.devicePixelRatio || 1);
        const offsetPixel = 18 / displayScale;
        const rot = smaMeasurement.windDirection ? smaMeasurement.windDirection.rad : 0.0;
        const anchor = [-offsetPixel * Math.sin(rot) + 7, offsetPixel * Math.cos(rot) + 7];

        return new Style({
            image: new Icon({
                anchor: anchor,
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                opacity: 0.9,
                img: smallBoxImage,
                imgSize : [smallBoxImage.width, smallBoxImage.height],
                scale: displayScale
            })
        });
    }


    private static getSmallBoxImage(smaMeasurement: SmaMeasurement): HTMLCanvasElement {
        const pixelRatio = window.devicePixelRatio || 1;
        const canvas = OlSmaMeasurementHelper.createCanvas(15, 15, pixelRatio);
        const ctx = OlSmaMeasurementHelper.getCanvasContext(canvas);

        // sunshine box
        if (smaMeasurement.sunTime != null && smaMeasurement.sunTime.min > 0.0) {
            OlSmaMeasurementHelper.drawFillBox(ctx, 1, 1, 5, 13, 2,
                OlSmaMeasurementHelper.getSunColor(smaMeasurement.sunTime),
                OlSmaMeasurementHelper.getSunLevelFact(smaMeasurement.sunTime));
        }

        // precip box
        if (smaMeasurement.precipitationMM != null && smaMeasurement.precipitationMM > 0.0) {
            OlSmaMeasurementHelper.drawFillBox(ctx, 9, 1, 5, 13, 2,
                OlSmaMeasurementHelper.getRainColor(smaMeasurement.precipitationMM),
                OlSmaMeasurementHelper.getRainLevelFact(smaMeasurement.precipitationMM));
        }

        return canvas;
    }
}
