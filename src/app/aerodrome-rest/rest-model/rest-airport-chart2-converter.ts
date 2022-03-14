import {AirportChart} from '../../aerodrome/domain-model/airport-chart';
import {RestExtent2dConverter} from '../../geo-physics-rest/rest-model/rest-extent2d-converter';
import {IRestAirportChart2} from './i-rest-airport-chart2';


export class RestAirportChart2Converter {
    public static fromRest(restAdChart: IRestAirportChart2): AirportChart {
        return new AirportChart(
            restAdChart.id,
            restAdChart.airport_icao,
            restAdChart.source,
            restAdChart.type,
            restAdChart.filename,
            RestExtent2dConverter.fromRest(restAdChart.extent)
        );
    }


    public static fromRestList(restAdChartList: IRestAirportChart2[]): AirportChart[] {
        return restAdChartList.map(restAdChart => this.fromRest(restAdChart));
    }
}
