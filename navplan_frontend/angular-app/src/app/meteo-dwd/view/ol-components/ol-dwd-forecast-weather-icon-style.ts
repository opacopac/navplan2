import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {environment} from '../../../../environments/environment';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {WeatherInfo} from '../../domain/model/weather-info';
import {StringnumberHelper} from '../../../system/domain/service/stringnumber/stringnumber-helper';


export class OlDwdForecastWeatherIconStyle {
    public static createPointStyle(weatherInfo: WeatherInfo, mapRotation: Angle): Style {
        const url = environment.iconBaseUrl + this.getIconFileName(weatherInfo);

        const rot = mapRotation.rad;
        const anchorX = 0;
        const anchorY = 0;

        const fakeX = anchorX * Math.cos(-rot) - anchorY * Math.sin(-rot) + 16;
        const fakeY = anchorX * Math.sin(-rot) + anchorY * Math.cos(-rot) + 16;

        const ceilingText = weatherInfo.hasCeiling()
            ? '\n' + weatherInfo.ceiling.getHeightAmsl().ft + 'ft AMSL' // TODO
            : '';

        return new Style({
            image: new Icon(({
                anchor: [fakeX, fakeY],
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                scale: 1,
                rotation: rot,
                rotateWithView: false,
                src: url
            })),
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                text: weatherInfo.getWwText() + ceilingText,
                fill: new Fill({color: '#000000'}),
                stroke: new Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 24
            })
        });
    }


    private static getIconFileName(weatherInfo: WeatherInfo): string {
        if (weatherInfo.wwValue === 2) {
            return 'ww_' + StringnumberHelper.zeroPad(weatherInfo.wwValue, 2) + 'b.svg';
        }

        if (weatherInfo.wwValue === 3 && weatherInfo.isHighCloud()) {
            return 'ww_00.svg';
        }

        return 'ww_' + StringnumberHelper.zeroPad(weatherInfo.wwValue, 2) + '.svg';
    }
}
