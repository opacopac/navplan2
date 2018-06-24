import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { OlFeaturePoint } from './ol-feature';
import { MetarTaf } from '../metar-taf';
import { Position2d } from '../geometry/position2d';


export class OlMetarSky extends OlFeaturePoint {
    public constructor(
        public metarTaf: MetarTaf) {

        super(metarTaf);
    }


    protected getPosition(): Position2d {
        return this.metarTaf.position;
    }


    protected createPointStyle(): ol.style.Style {
        let src = environment.iconBaseUrl;
        const wx_cond = this.metarTaf.wx_cond ? this.metarTaf.wx_cond : '';

        switch (this.metarTaf.cloud_cover) {
            case 'CAVOK' :
            case 'SKC' :
            case 'CLR' :
            case 'NSC' :
                src += 'sky_skc.png';
                break;
            case 'FEW' :
                src += 'sky_few.png';
                break;
            case 'SCT' :
                src += 'sky_sct.png';
                break;
            case 'BKN' :
                src += 'sky_bkn.png';
                break;
            case 'OVC' :
                src += 'sky_ovc.png';
                break;
            default:
                return;
        }

        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [-24, 20],
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                scale: 1,
                src: src
            })),
            text: new ol.style.Text({
                textAlign: 'end',
                textBaseline: 'baseline',
                font: '13px Calibri,sans-serif',
                text: wx_cond,
                fill: new ol.style.Fill({color: '#000000'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 43,
                offsetY: -8
            })
        });
    }
}
