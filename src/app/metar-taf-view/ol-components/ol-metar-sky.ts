import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {environment} from '../../../environments/environment';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {Position2d} from '../../geo-physics/domain-model/geometry/position2d';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {OlVectorLayer} from '../../base-map-view/ol-model/ol-vector-layer';
import {OlFeature} from '../../base-map-view/ol-model/ol-feature';
import {OlGeometry} from '../../base-map-view/ol-model/ol-geometry';


export class OlMetarSky {
    public static draw(
        metarTaf: MetarTaf,
        position: Position2d,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(metarTaf, true);
        olFeature.setStyle(this.createPointStyle(metarTaf));
        olFeature.setGeometry(OlGeometry.fromPoint(position));
        layer.addFeature(olFeature);
    }


    private static createPointStyle(metarTaf: MetarTaf): Style {
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
                anchorXUnits: IconAnchorUnits.PIXELS,
                anchorYUnits: IconAnchorUnits.PIXELS,
                scale: 1,
                src: src
            })),
            text: new Text({
                textAlign: 'end',
                textBaseline: 'baseline',
                font: '13px Calibri,sans-serif',
                text: wx_cond,
                fill: new Fill({color: '#000000'}),
                stroke: new Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 43,
                offsetY: -8
            })
        });
    }
}
