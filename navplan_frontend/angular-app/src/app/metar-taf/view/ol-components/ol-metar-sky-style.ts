import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {environment} from '../../../../environments/environment';
import {MetarTaf} from '../../domain/model/metar-taf';


export class OlMetarSkyStyle {
    public static createPointStyle(metarTaf: MetarTaf): Style {
        let src = environment.iconBaseUrl;
        const wx_cond = metarTaf.wx_cond ? metarTaf.wx_cond : '';

        switch (metarTaf.cloud_cover) {
            case 'CAVOK' :
            case 'SKC' :
            case 'CLR' :
            case 'NSC' :
                src += 'sky_skc.svg';
                break;
            case 'FEW' :
                src += 'sky_few.svg';
                break;
            case 'SCT' :
                src += 'sky_sct.svg';
                break;
            case 'BKN' :
                src += 'sky_bkn.svg';
                break;
            case 'OVC' :
                src += 'sky_ovc.svg';
                break;
            default:
                return;
        }

        return new Style({
            image: new Icon(({
                anchor: [-24, 20],
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                scale: 1,
                src: src
            })),
            text: new Text({
                textAlign: 'end',
                font: '13px Calibri,sans-serif',
                text: wx_cond,
                fill: new Fill({color: '#000000'}),
                stroke: new Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 57,
                offsetY: -10
            })
        });
    }
}
