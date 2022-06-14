import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {environment} from '../../../../environments/environment';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {WwValue} from '../../domain/model/ww-value';
import {StringnumberHelper} from '../../../system/domain/service/stringnumber/stringnumber-helper';


export class OlDwdForecastWeatherIconStyle {
    public static createPointStyle(wwValue: WwValue, mapRotation: Angle): Style {
        const url = environment.iconBaseUrl + this.getIconFileName(wwValue.value);

        const rot = mapRotation.rad;
        const anchorX = 0;
        const anchorY = 0;

        const fakeX = anchorX * Math.cos(-rot) - anchorY * Math.sin(-rot) + 16;
        const fakeY = anchorX * Math.sin(-rot) + anchorY * Math.cos(-rot) + 16;

        return new Style({
            image: new Icon(({
                anchor: [fakeX, fakeY],
                anchorXUnits: IconAnchorUnits.PIXELS,
                anchorYUnits: IconAnchorUnits.PIXELS,
                scale: 1,
                rotation: rot,
                rotateWithView: false,
                src: url
            })),
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                text: wwValue.getText(),
                fill: new Fill({color: '#000000'}),
                stroke: new Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 24
            })
        });
    }


    private static getIconFileName(wwValue: number): string {
        return 'ww_' + StringnumberHelper.zeroPad(wwValue, 2) + '.svg';
    }
}
