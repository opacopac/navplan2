import {Observable, Subscription} from 'rxjs';
import {OlAirportChartCloser} from './ol-airport-chart-closer';
import {AirportChart} from '../../domain/model/airport-chart';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {IBaseMap} from '../../../base-map/domain/model/i-base-map';


export class OlAirportChartContainer {
    private readonly chartSubscription: Subscription;


    constructor(
        private baseMap: IBaseMap,
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
                this.baseMap.showImage({
                    imageId: airportChart.id,
                    imageUrl: airportChart.fileName,
                    extent: airportChart.extent,
                    opacity: 0.9,
                    fitInView: true
                });
                OlAirportChartCloser.draw(airportChart, this.chartCloserLayer);
            });
        }
    }


    private clearFeatures() {
        this.chartCloserLayer.clear();
    }
}
