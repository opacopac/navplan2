import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {environment} from '../../../../environments/environment';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {WindInfo} from '../../domain/model/wind-info';


export class OlDwdForecastWindIconStyle {
    public static createPointStyle(windSpeedDir: WindInfo, mapRotation: Angle): Style {
        let src = environment.iconBaseUrl;
        let rot = windSpeedDir.dir ? windSpeedDir.dir.addDeg(90).rad + mapRotation.rad : undefined;
        const windrange = [[0, '0'], [2, '1-2'], [7, '5'], [12, '10'], [17, '15'], [22, '20'], [27, '25'], [32, '30'],
            [37, '35'], [42, '40'], [47, '45'], [55, '50'], [65, '60'], [75, '70'], [85, '80'], [95, '90'], [105, '100']];


        for (let i = 0; i < windrange.length; i++) {
            if (windSpeedDir.speed.kt <= windrange[i][0]) {
                src += 'wind_' + windrange[i][1] + 'kt.svg';
                if (i === 0) {
                    rot = 0;
                }

                break;
            }
        }

        if (!src) {
            return;
        }

        const anchorX = 0;
        const anchorY = 0;
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
                src: src
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
