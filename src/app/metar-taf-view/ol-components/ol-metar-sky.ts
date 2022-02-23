import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {Position2d} from '../../geo-physics/domain-model/geometry/position2d';
import {OlVectorLayer} from '../../base-map-view/ol-model/ol-vector-layer';
import {OlFeature} from '../../base-map-view/ol-model/ol-feature';
import {OlGeometry} from '../../base-map-view/ol-model/ol-geometry';
import {OlMetarSkyStyle} from './ol-metar-sky-style';


export class OlMetarSky {
    public static draw(
        metarTaf: MetarTaf,
        position: Position2d,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(metarTaf, true);
        olFeature.setStyle(OlMetarSkyStyle.createPointStyle(metarTaf));
        olFeature.setGeometry(OlGeometry.fromPoint(position));
        layer.addFeature(olFeature);
    }
}
