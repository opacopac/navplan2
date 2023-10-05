import {MetarTaf} from '../../domain/model/metar-taf';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map/view/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map/view/ol-model/ol-geometry';
import {OlMetarWindStyle} from './ol-metar-wind-style';


export class OlMetarWind {
    public static draw(
        metarTaf: MetarTaf,
        position: Position2d,
        mapRotation: Angle,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(metarTaf, true);
        olFeature.setStyle(OlMetarWindStyle.createPointStyle(metarTaf, mapRotation));
        olFeature.setGeometry(OlGeometry.fromPoint(position));
        layer.addFeature(olFeature);
    }
}
