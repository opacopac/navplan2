import {AirportChart} from '../../domain/model/airport-chart';
import {IRestAirportChart} from '../model/i-rest-airport-chart';
import {OlGeometry} from '../../../base-map/view/ol-model/ol-geometry';


export class RestAirportChartConverter {
    public static fromRest(restAdChart: IRestAirportChart): AirportChart {
        return new AirportChart(
            restAdChart.id,
            restAdChart.airport_icao,
            restAdChart.source,
            restAdChart.type,
            restAdChart.filename,
            OlGeometry.getExtentFromMercator([
                parseInt(restAdChart.mercator_w, 10),
                parseInt(restAdChart.mercator_s, 10),
                parseInt(restAdChart.mercator_e, 10),
                parseInt(restAdChart.mercator_n, 10)
            ])
        );
    }


    public static fromRestList(restAdChartList: IRestAirportChart[]): AirportChart[] {
        return restAdChartList.map(restAdChart => RestAirportChartConverter.fromRest(restAdChart));
    }
}
