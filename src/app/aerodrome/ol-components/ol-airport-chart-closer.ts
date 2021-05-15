import {Feature} from 'ol';
import {Icon, Style} from 'ol/style';
import {environment} from '../../../environments/environment';
import VectorLayer from 'ol/layer/Vector';
import {AirportChart} from '../domain-model/airport-chart';
import {OlHelper} from '../../base-map/ol-service/ol-helper';


export class OlAirportChartCloser {
    private readonly olFeature: Feature;


    public constructor(
        airportChart: AirportChart,
        layer: VectorLayer
    ) {
        this.olFeature = OlHelper.createFeature(airportChart, true);
        this.olFeature.setStyle(this.createPointStyle());
        this.olFeature.setGeometry(OlHelper.getPointGeometry(airportChart.extent.maxPos));
        layer.getSource().addFeature(this.olFeature);
    }


    protected createPointStyle(): Style {
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
