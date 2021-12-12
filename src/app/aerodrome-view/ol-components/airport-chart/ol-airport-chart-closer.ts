import {Icon, Style} from 'ol/style';
import {environment} from '../../../../environments/environment';
import {AirportChart} from '../../../aerodrome/domain-model/airport-chart';
import {OlVectorLayer} from '../../../base-map-view/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map-view/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map-view/ol-model/ol-geometry';


export class OlAirportChartCloser {
    public static draw(
        airportChart: AirportChart,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(airportChart, true);
        olFeature.setStyle(this.createPointStyle());
        olFeature.setGeometry(OlGeometry.fromPoint(airportChart.extent.maxPos));
        layer.addFeature(olFeature);
    }


    private static createPointStyle(): Style {
        const src = environment.iconBaseUrl;

        return new Style({
            image: new Icon(({
                scale: 1,
                opacity: 0.90,
                src: src + 'closerbutton.png'
            }))
        });
    }
}
