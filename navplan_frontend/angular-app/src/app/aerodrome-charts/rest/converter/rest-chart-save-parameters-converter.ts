import {ChartSaveParameters} from '../../domain/model/chart-save-parameters';
import {IRestChartSaveParameters} from '../model/i-rest-chart-save-parameters';
import {RestOriginalFileParametersConverter} from './rest-original-file-parameters-converter';
import {RestChartRegistrationConverter} from './rest-chart-registration-converter';


export class RestChartSaveParametersConverter {
    public static toRest(chartSaveParams: ChartSaveParameters): IRestChartSaveParameters {
        return {
            chartUrl: chartSaveParams.chartUrl,
            chartName: chartSaveParams.chartName,
            originalFileParameters: RestOriginalFileParametersConverter.toRest(chartSaveParams.originalFileParameters),
            chartRegistration: RestChartRegistrationConverter.toRest(chartSaveParams.chartRegistration)
        };
    }
}
