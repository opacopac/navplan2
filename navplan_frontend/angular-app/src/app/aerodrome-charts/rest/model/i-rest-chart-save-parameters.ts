import {IRestOriginalFileParameters} from './i-rest-original-file-parameters';
import {IRestChartRegistration} from './i-rest-chart-registration';


export interface IRestChartSaveParameters {
    chartUrl: string;
    chartName: string;
    originalFileParameters: IRestOriginalFileParameters;
    chartRegistration: IRestChartRegistration;
}
