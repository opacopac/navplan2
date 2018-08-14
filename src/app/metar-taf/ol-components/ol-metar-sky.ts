import * as ol from 'openlayers';
import {environment} from '../../../environments/environment';
import {MetarTaf} from '../model/metar-taf';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {Position2d} from '../../shared/model/geometry/position2d';


export class OlMetarSky extends OlComponent {
    private readonly olFeature: ol.Feature;


    public constructor(
        metarTaf: MetarTaf,
        position: Position2d,
        private readonly source: ol.source.Vector) {

        super();

        this.olFeature = this.createFeature(metarTaf);
        this.olFeature.setStyle(this.createPointStyle(metarTaf));
        this.setPointGeometry(this.olFeature, position);
        this.source.addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    private createPointStyle(metarTaf: MetarTaf): ol.style.Style {
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
