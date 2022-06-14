import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {environment} from '../../../../environments/environment';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {WwValue} from '../../domain/model/ww-value';


export class OlDwdForecastWeatherIconStyle {
    public static createPointStyle(wwValue: WwValue, mapRotation: Angle): Style {
        const url = environment.iconBaseUrl + this.getIconFileName(wwValue.value);

        const rot = mapRotation.rad;
        const anchorX = -15 - 17;
        const anchorY = 5 - 17;
        const fakeX = anchorX * Math.cos(-rot) - anchorY * Math.sin(-rot) + 17;
        const fakeY = anchorX * Math.sin(-rot) + anchorY * Math.cos(-rot) + 17;

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
                fill: new Fill({color: '#0077FF'}),
                stroke: new Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 20
            })
        });
    }


    private static getIconFileName(wwValue: number): string {
        switch (wwValue) {
            case 0: return 'sky_skc.svg';
            case 1: return 'sky_few.svg';
            case 2: return 'sky_bkn.svg';
            case 3: return 'sky_ovc.svg';
            default: return 'ww_' + wwValue + '.svg';
        }
    }
}
