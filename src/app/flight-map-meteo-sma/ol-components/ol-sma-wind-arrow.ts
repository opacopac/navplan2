import {Circle, Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {SmaMeasurement} from '../../meteo-sma/domain-model/sma-measurement';
import {Angle} from '../../common/geo-math/domain-model/quantities/angle';
import {OlVectorLayer} from '../../base-map/ol-model/ol-vector-layer';
import {OlGeometry} from '../../base-map/ol-model/ol-geometry';
import {OlFeature} from '../../base-map/ol-model/ol-feature';
import {OlSmaMeasurementHelper} from './ol-sma-measurement-helper';


export class OlSmaWindArrow {
    public static draw(
        smaMeasurement: SmaMeasurement,
        layer: OlVectorLayer,
        mapRotation: Angle
    ) {
        const olFeatureDot = new OlFeature(smaMeasurement, true);
        olFeatureDot.setStyle(this.createDotStyle(smaMeasurement));
        olFeatureDot.setGeometry(OlGeometry.fromPoint(smaMeasurement.station.position));
        layer.addFeature(olFeatureDot);

        const olFeatureArrow = new OlFeature(smaMeasurement, true);
        olFeatureArrow.setStyle(this.createArrowStyle(smaMeasurement, mapRotation));
        olFeatureArrow.setGeometry(OlGeometry.fromPoint(smaMeasurement.station.position));
        layer.addFeature(olFeatureArrow);
    }


    private static createArrowStyle(smaMeasurement: SmaMeasurement, mapRotation: Angle): Style {
        const windArrowImage = this.getWindArrowImage(smaMeasurement);
        const displayScale = 1 / (window.devicePixelRatio || 1);
        const windDir = smaMeasurement.windDirection ? smaMeasurement.windDirection : Angle.createZero();
        return new Style({
            image: new Icon({
                anchor: [0.5, 0.0],
                opacity: 1.0,
                img: windArrowImage,
                imgSize : [windArrowImage.width, windArrowImage.height],
                scale: displayScale,
                rotation: windDir.rad,
                rotateWithView: true
            }),
            text: new Text({
                // textAlign: align,
                // textBaseline: baseline,
                font: 'bold 15px Calibri,sans-serif',
                text: Math.round(smaMeasurement.windSpeed ? smaMeasurement.windSpeed.kt : 0) + 'kt',
                fill: new Fill({color: '#FFFFFF'}),
                stroke: new Stroke({color: '#000000', width: 2}),
                offsetX: -windArrowImage.height / 2 * displayScale * Math.sin(windDir.rad + mapRotation.rad),
                offsetY: windArrowImage.height / 2 * displayScale * Math.cos(windDir.rad + mapRotation.rad)
            })
        });
    }


    private static getWindArrowImage(smaMeasurement: SmaMeasurement): HTMLCanvasElement {
        const arrWidth = 30;
        const arrHalfWidth = Math.floor(arrWidth / 2);
        const arrLength = arrHalfWidth + Math.round(smaMeasurement.windSpeed ? smaMeasurement.windSpeed.kmh * 5 : 0);
        const arrTipLength = 10;
        const arrTipWidth = arrTipLength / 2;
        const fillColor = '#FFFFFF';
        const lineWidth = 2;
        const pixelRatio = window.devicePixelRatio || 1;
        const canvas = OlSmaMeasurementHelper.createCanvas(arrWidth, arrLength + arrTipLength, pixelRatio);
        const ctx = OlSmaMeasurementHelper.getCanvasContext(canvas);

        // arrow shaft
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = fillColor;
        ctx.moveTo(arrHalfWidth, 0);
        ctx.lineTo(arrHalfWidth, arrLength);
        ctx.stroke();

        // arrow tip
        ctx.fillStyle = fillColor;
        ctx.moveTo(arrHalfWidth, arrLength + arrTipLength);
        ctx.lineTo(arrHalfWidth - arrTipWidth, arrLength);
        ctx.lineTo(arrHalfWidth + arrTipWidth, arrLength);
        ctx.closePath();
        ctx.fill();

        return canvas;
    }


    private static createDotStyle(smaMeasurement: SmaMeasurement): Style {
        return new Style({
            image: new Circle({
                radius: 4,
                fill: new Fill({
                    color: '#FFFFFF'
                }),
                stroke: new Stroke({
                    color: '#000000',
                    width: 2
                })
            })
        });
    }
}
