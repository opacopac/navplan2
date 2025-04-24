import {UploadedChartInfo} from '../../domain/model/uploaded-chart-info';
import {IRestUploadAdChartInfo} from '../model/i-rest-upload-ad-chart-info';


export class RestUploadedChartInfoConverter {
    public static fromRest(chartInfo: IRestUploadAdChartInfo): UploadedChartInfo {
        return new UploadedChartInfo(
            chartInfo.success,
            chartInfo.message,
            chartInfo.filename,
            chartInfo.type,
            chartInfo.url
        );
    }
}
