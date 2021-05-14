import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {Observable, Subscription} from 'rxjs';
import VectorLayer from 'ol/layer/Vector';
import {OlAirportChartCloser} from './ol-airport-chart-closer';
import {AirportChart} from '../domain-model/airport-chart';


export class OlAirportChartContainer extends OlComponentBase {
    private readonly chartSubscription: Subscription;


    constructor(
        private readonly chartCloserLayer: VectorLayer,
        charts$: Observable<AirportChart[]>
    ) {
        super();

        this.chartSubscription = charts$.subscribe((charts) => {
            this.clearFeatures();
            this.addFeatures(charts);
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.chartSubscription.unsubscribe();
        this.clearFeatures();
    }


    private addFeatures(airportCharts: AirportChart[]) {
        if (airportCharts) {
            airportCharts.forEach(airportChart => new OlAirportChartCloser(airportChart, this.chartCloserLayer));
        }
    }


    private clearFeatures() {
        this.chartCloserLayer.getSource().clear(true);
    }
}
