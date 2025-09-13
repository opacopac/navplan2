import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map/view/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map/view/ol-model/ol-geometry';
import {OlMeteoForecastWindIconStyle} from './ol-meteo-forecast-wind-icon-style';
import {WindInfo} from '../../domain/model/wind-info';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';


export class OlMeteoForecastWindIcon {
    public static draw(
        windSpeedDir: WindInfo,
        position: Position2d,
        mapRotation: Angle,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(windSpeedDir, false);
        olFeature.setStyle(OlMeteoForecastWindIconStyle.createPointStyle(windSpeedDir, mapRotation));
        olFeature.setGeometry(OlGeometry.fromPoint(position));
        layer.addFeature(olFeature);
    }
}
