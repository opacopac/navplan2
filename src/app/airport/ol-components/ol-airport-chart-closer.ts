import {Feature} from 'ol';
import {Icon, Style} from 'ol/style';
import {environment} from '../../../environments/environment';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import VectorLayer from 'ol/layer/Vector';
import {AirportChart} from '../domain-model/airport-chart';


export class OlAirportChartCloser extends OlComponentBase {
    private readonly olFeature: Feature;


    public constructor(
        airportChart: AirportChart,
        layer: VectorLayer
    ) {
        super();

        this.olFeature = this.createFeature(airportChart);
        this.olFeature.setStyle(this.createPointStyle());
        this.setPointGeometry(this.olFeature, airportChart.extent.maxPos);
        layer.getSource().addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
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
