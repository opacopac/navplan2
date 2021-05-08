import {AdChart} from '../domain-model/ad-chart';
import {IRestAdChart} from './i-rest-ad-chart';
import {OlHelper} from '../../base-map/ol-service/ol-helper';


export class AdChartConverter {
    public static fromRest(restAdChart: IRestAdChart): AdChart {
        return new AdChart(
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


    public static fromRestList(restAdChartList: IRestAdChart[]): AdChart[] {
        return restAdChartList.map(restAdChart => AdChartConverter.fromRest(restAdChart));
    }
}
