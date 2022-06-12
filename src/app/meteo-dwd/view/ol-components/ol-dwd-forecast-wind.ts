import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map/view/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map/view/ol-model/ol-geometry';
import {OlDwdForecastWindStyle} from './ol-dwd-forecast-wind-style';
import {WindSpeedDir} from '../../domain/model/wind-speed-dir';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';


export class OlDwdForecastWind {
    public static draw(
        windSpeedDir: WindSpeedDir,
        position: Position2d,
        mapRotation: Angle,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(windSpeedDir, false);
        olFeature.setStyle(OlDwdForecastWindStyle.createPointStyle(windSpeedDir, mapRotation));
        olFeature.setGeometry(OlGeometry.fromPoint(position));
        layer.addFeature(olFeature);
    }
}
