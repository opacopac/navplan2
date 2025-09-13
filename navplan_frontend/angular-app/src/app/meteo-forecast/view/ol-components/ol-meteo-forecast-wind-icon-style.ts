import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {WindInfo} from '../../domain/model/wind-info';
import {WindIcon} from '../../../meteo-common/view/wind_icons/wind-icon';


export class OlMeteoForecastWindIconStyle {
    public static createPointStyle(windSpeedDir: WindInfo, mapRotation: Angle): Style {
        const windIcon = WindIcon.createFrom(windSpeedDir.speed, windSpeedDir.dir, mapRotation);

        if (!windIcon) {
            return;
        }

        const anchorX = 0;
        const anchorY = 0;
        const rot = windIcon.rot.rad;
        const fakeX = anchorX * Math.cos(-rot) - anchorY * Math.sin(-rot) + 17;
        const fakeY = anchorX * Math.sin(-rot) + anchorY * Math.cos(-rot) + 17;

        const gustText = windSpeedDir.hasGusts() ? ' G' + Math.round(windSpeedDir.gust.kt) : '';
        const windText = Math.round(windSpeedDir.speed.kt) + 'KT' + gustText; // TODO
        const gustLevel = windSpeedDir.getGustLevel();

        let textColor = '#000000';
        if (gustLevel === 3) {
            textColor = '#FF0000';
        } else if (gustLevel === 2) {
            textColor = '#FFAA00';
        }

        return new Style({
            image: new Icon(({
                anchor: [fakeX, fakeY],
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                scale: 1,
                rotation: rot,
                rotateWithView: false,
                src: windIcon.src
            })),
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                text: windText,
                fill: new Fill({color: textColor}),
                stroke: new Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 32
            })
        });
    }
}
