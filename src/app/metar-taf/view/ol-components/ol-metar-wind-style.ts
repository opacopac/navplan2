import {Icon, Style} from 'ol/style';
import {MetarTaf} from '../../domain/model/metar-taf';
import {environment} from '../../../../environments/environment';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';


export class OlMetarWindStyle {
    public static createPointStyle(metarTaf: MetarTaf, mapRotation: Angle): Style {
        let src = environment.iconBaseUrl;
        let rot = metarTaf.wind_dir_deg ?
            Angle.deg2rad(metarTaf.wind_dir_deg + 90) + mapRotation.rad : undefined;
        const windrange = [[0, '0'], [2, '1-2'], [7, '5'], [12, '10'], [17, '15'], [22, '20'], [27, '25'], [32, '30'],
            [37, '35'], [42, '40'], [47, '45'], [55, '50'], [65, '60'], [75, '70'], [85, '80'], [95, '90'], [105, '100']];


        for (let i = 0; i < windrange.length; i++) {
            if (metarTaf.wind_speed_kt <= windrange[i][0]) {
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

        const anchorX = -15 - 17;
        const anchorY = 5 - 17;
        const fakeX = anchorX * Math.cos(-rot) - anchorY * Math.sin(-rot) + 17;
        const fakeY = anchorX * Math.sin(-rot) + anchorY * Math.cos(-rot) + 17;

        return new Style({
            image: new Icon(({
                anchor: [fakeX, fakeY],
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                scale: 1,
                rotation: rot,
                rotateWithView: false,
                src: src
            }))
        });
    }
}
