import {AirportChart} from '../../../aerodrome/domain-model/airport-chart';
import {OlVectorLayer} from '../../../base-map-view/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map-view/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map-view/ol-model/ol-geometry';
import {OlAirportChartCloserStyle} from './ol-airport-chart-closer-style';


export class OlAirportChartCloser {
    public static draw(
        airportChart: AirportChart,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(airportChart, true);
        olFeature.setStyle(OlAirportChartCloserStyle.STYLE);
        olFeature.setGeometry(OlGeometry.fromPoint(airportChart.extent.maxPos));
        layer.addFeature(olFeature);
    }
}
