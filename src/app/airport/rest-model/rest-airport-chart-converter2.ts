import {AirportChart2} from '../domain-model/airport-chart2';
import {IRestAirportChart2} from './i-rest-airport-chart2';
import {OlHelper} from '../../base-map/ol-service/ol-helper';


export class RestAirportChartConverter2 {
    public static fromRest(restAdChart: IRestAirportChart2): AirportChart2 {
        return new AirportChart2(
            restAdChart.id,
            restAdChart.airport_icao,
            restAdChart.source,
            restAdChart.type,
            restAdChart.filename,
            OlHelper.getExtentFromMercator([
                parseInt(restAdChart.mercator_w, 10),
                parseInt(restAdChart.mercator_s, 10),
                parseInt(restAdChart.mercator_e, 10),
                parseInt(restAdChart.mercator_n, 10)
            ])
        );
    }


    public static fromRestList(restAdChartList: IRestAirportChart2[]): AirportChart2[] {
        return restAdChartList.map(restAdChart => RestAirportChartConverter2.fromRest(restAdChart));
    }
}
