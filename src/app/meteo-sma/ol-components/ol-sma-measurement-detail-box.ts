import {Icon, Style} from 'ol/style';
import {SmaMeasurement} from '../domain-model/sma-measurement';
import {OlVectorLayer} from '../../base-map/ol-model/ol-vector-layer';
import {OlFeature} from '../../base-map/ol-model/ol-feature';
import {OlGeometry} from '../../base-map/ol-model/ol-geometry';
import {OlSmaMeasurementHelper} from './ol-sma-measurement-helper';
import {StringnumberHelper} from '../../system/domain-service/stringnumber/stringnumber-helper';
import {DatetimeHelper} from '../../system/domain-service/datetime/datetime-helper';
import {Angle} from '../../common/geo-math/domain-model/quantities/angle';


export class OlSmaMeasurementDetailBox {
    public static draw(
        smaMeasurement: SmaMeasurement,
        layer: OlVectorLayer,
        mapRotation: Angle
    ) {
        const olFeature = new OlFeature(smaMeasurement, true);
        olFeature.setStyle(this.createPointStyle(smaMeasurement, mapRotation));
        olFeature.setGeometry(OlGeometry.fromPoint(smaMeasurement.station.position));
        layer.addFeature(olFeature);
    }


    private static createPointStyle(smaMeasurement: SmaMeasurement, mapRotation: Angle): Style {
        const detailBoxImage = this.getDetailBoxImage(smaMeasurement);
        const displayScale = 1 / (window.devicePixelRatio || 1);
        const rotDeg = smaMeasurement.windDirection ? smaMeasurement.windDirection.deg + mapRotation.deg : mapRotation.deg;
        const anchor = (rotDeg >= 90 && rotDeg < 270) ? [0.5, -0.2] : [0.5, 1.2];

        return new Style({
            image: new Icon({
                anchor: anchor,
                opacity: 0.9,
                img: detailBoxImage,
                imgSize : [detailBoxImage.width, detailBoxImage.height],
                scale: displayScale
            })
        });
    }


    private static getDetailBoxImage(smaMeasurement: SmaMeasurement): HTMLCanvasElement {
        const boxWidth = 230;
        const boxHeight = 80;
        const paddingTB = 3;
        const paddingLR = 5;
        const lineHeight = 17;
        const textColor = '#FFFFFF';
        const textColorTime = '#CCCCCC';
        const pixelRatio = window.devicePixelRatio || 1;
        const canvas = OlSmaMeasurementHelper.createCanvas(boxWidth, boxHeight, pixelRatio);
        const ctx = OlSmaMeasurementHelper.getCanvasContext(canvas);

        // box
        OlSmaMeasurementHelper.drawRectangle(ctx, 0, 0, boxWidth, boxHeight , '#666666', '#000000', 1);

        // station name + height text
        ctx.font = 'bold 14px Calibri,sans-serif';
        const title_text = smaMeasurement.station.name + '  (' + Math.round(smaMeasurement.station.altitude.getHeightAmsl().ft) + 'ft)';
        OlSmaMeasurementHelper.drawText(ctx, paddingLR, paddingTB + lineHeight, title_text, textColor);

        // info-icon text
        // tslint:disable-next-line:max-line-length
        // var url = "http://www.meteoswiss.admin.ch/home/measurement-and-forecasting-systems/land-based-stations/automatisches-messnetz.html?station=" + smaMeasurement.station_id;
        // var link = document.createElement("a");
        // link.setAttribute("xlink:href", url);
        // link.setAttribute("target", "_blank");
        // drawText(ctx, boxWidth - paddingLR - 20, paddingTB + lineHeight, "🛈", textColor);

        ctx.font = 'normal 14px Calibri,sans-serif';

        // wind text
        if (smaMeasurement.windDirection && smaMeasurement.windSpeed && smaMeasurement.windGusts) {
            const wind_text = StringnumberHelper.zeroPad(smaMeasurement.windDirection.deg, 3) + '°  '
                + Math.round(smaMeasurement.windSpeed.kt) + '-'
                + Math.round(smaMeasurement.windGusts.kt) + 'kt';
            OlSmaMeasurementHelper.drawText(ctx, paddingLR, paddingTB + 2 * lineHeight, wind_text, textColor);
        }

        // temp text
        if (smaMeasurement.temperature) {
            const temp_text = Math.round(smaMeasurement.temperature.c) + '°C';
            OlSmaMeasurementHelper.drawText(ctx, paddingLR + 75 + 17, paddingTB + 2 * lineHeight, temp_text, textColor);
        }

        // humidity text
        if (smaMeasurement.humidityProc) {
            const humidity_text = smaMeasurement.humidityProc + '% RH';
            OlSmaMeasurementHelper.drawText(ctx, paddingLR + 160, paddingTB + 2 * lineHeight, humidity_text, textColor);
        }

        // qnh text
        if (smaMeasurement.qnh) {
            const qnh_text = 'QNH ' + Math.round(smaMeasurement.qnh.hPa);
            OlSmaMeasurementHelper.drawText(ctx, paddingLR, paddingTB + 3 * lineHeight, qnh_text, textColor);
        }

        // sunshine box
        if (smaMeasurement.sunTime != null) {
            OlSmaMeasurementHelper.drawFillBox(ctx, paddingLR + 75, 43, 14, 14, 2,
                OlSmaMeasurementHelper.getSunColor(smaMeasurement.sunTime),
                OlSmaMeasurementHelper.getSunLevelFact(smaMeasurement.sunTime));

            const sun_text = smaMeasurement.sunTime.min + '/10min';
            OlSmaMeasurementHelper.drawText(ctx, paddingLR + 75 + 17, paddingTB + 3 * lineHeight, sun_text, textColor);
        }

        // precip box
        if (smaMeasurement.precipitationMM != null) {
            OlSmaMeasurementHelper.drawFillBox(ctx, paddingLR + 160, 43, 14, 14, 2,
                OlSmaMeasurementHelper.getRainColor(smaMeasurement.precipitationMM),
                OlSmaMeasurementHelper.getRainLevelFact(smaMeasurement.precipitationMM));

            const sun_text = smaMeasurement.precipitationMM + 'mm';
            OlSmaMeasurementHelper.drawText(ctx, paddingLR + 160 + 17, paddingTB + 3 * lineHeight, sun_text, textColor);
        }

        // time text
        ctx.font = 'italic 13px Calibri,sans-serif';
        if (smaMeasurement.measurementTime) {
            const measureDate = smaMeasurement.measurementTime.date;
            let time_text = measureDate.toLocaleDateString() + ' '
                + StringnumberHelper.zeroPad(measureDate.getHours(), 2) + ':'
                + StringnumberHelper.zeroPad(measureDate.getMinutes(), 2);
            time_text += ' (' + DatetimeHelper.getHourMinAgeStringFromMs(measureDate.getTime()) + ' ago)';
            OlSmaMeasurementHelper.drawText(ctx, paddingLR, paddingTB + 4 * lineHeight, time_text, textColorTime);
        }

        return canvas;
    }
}
