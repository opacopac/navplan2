import {AirportChart} from '../../domain/model/airport-chart';
import {RestExtent2dConverter} from '../../../geo-physics/rest/model/rest-extent2d-converter';
import {IRestAirportChart} from '../model/i-rest-airport-chart';
import {RestOriginalFileParametersConverter} from './rest-original-file-parameters-converter';
import {RestChartRegistrationConverter} from './rest-chart-registration-converter';


export class RestAirportChartConverter {
    public static fromRest(restAdChart: IRestAirportChart): AirportChart {
        return new AirportChart(
            restAdChart.id,
            restAdChart.userId,
            restAdChart.airportIcao,
            restAdChart.source,
            restAdChart.name,
            restAdChart.filename,
            RestExtent2dConverter.fromRest(restAdChart.extent),
            RestOriginalFileParametersConverter.fromRest(restAdChart.originalFileParameters),
            RestChartRegistrationConverter.fromRest(restAdChart.chartRegistration),
        );
    }


    public static toRest(adChart: AirportChart): IRestAirportChart {
        return {
            id: adChart.id,
            userId: adChart.userId,
            airportIcao: adChart.airportIcao,
            source: adChart.source,
            name: adChart.name,
            filename: adChart.fileName,
            extent: RestExtent2dConverter.toRest(adChart.extent),
            originalFileParameters: RestOriginalFileParametersConverter.toRest(adChart.originalFileParameters),
            chartRegistration: RestChartRegistrationConverter.toRest(adChart.chartRegistration)
        };
    }


    public static fromRestList(restAdChartList: IRestAirportChart[]): AirportChart[] {
        return restAdChartList.map(restAdChart => this.fromRest(restAdChart));
    }
}
