import {Observable, Subscription} from 'rxjs';
import {OlAirportChartCloser} from './ol-airport-chart-closer';
import {AirportChart} from '../../domain/model/airport-chart';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {environment} from '../../../../environments/environment';
import {OlImageLayer} from '../../../base-map/view/ol-model/ol-image-layer';


export class OlAirportChartContainer {
    private readonly chartSubscription: Subscription;


    constructor(
        private readonly chartLayer: OlImageLayer,
        private readonly chartCloserLayer: OlVectorLayer,
        charts$: Observable<AirportChart[]>
    ) {
        this.chartSubscription = charts$.subscribe((charts) => {
            this.clearFeatures();
            this.drawFeatures(charts);
        });
    }


    public destroy() {
        this.chartSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(airportCharts: AirportChart[]) {
        if (airportCharts) {
            airportCharts.forEach(airportChart => {
                // display chart
                const chartUrl = environment.chartBaseUrl + airportChart.fileName;
                this.chartLayer.setImageSource(airportChart.extent, chartUrl);

                // display closer
                OlAirportChartCloser.draw(airportChart, this.chartCloserLayer);
            });
        }
    }


    private clearFeatures() {
        this.chartCloserLayer.clear();
    }
}
