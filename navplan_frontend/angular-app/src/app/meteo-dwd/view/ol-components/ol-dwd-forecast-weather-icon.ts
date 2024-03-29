import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map/view/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map/view/ol-model/ol-geometry';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {WeatherInfo} from '../../domain/model/weather-info';
import {OlDwdForecastWeatherIconStyle} from './ol-dwd-forecast-weather-icon-style';


export class OlDwdForecastWeatherIcon {
    public static draw(
        weatherInfo: WeatherInfo,
        position: Position2d,
        mapRotation: Angle,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(weatherInfo, false);
        olFeature.setStyle(OlDwdForecastWeatherIconStyle.createPointStyle(weatherInfo, mapRotation));
        olFeature.setGeometry(OlGeometry.fromPoint(position));
        layer.addFeature(olFeature);
    }
}
