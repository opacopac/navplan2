import {Observable} from 'rxjs';
import {AirportChart} from '../model/airport-chart';
import {IAirportChartService} from './i-airport-chart.service';
import {IAirportChartRepoService} from './i-airport-chart-repo.service';
import {Injectable} from '@angular/core';
import {UploadedChartInfo} from '../model/uploaded-chart-info';
import {ChartUploadParameters} from '../model/chart-upload-parameters';
import {ChartSaveParameters} from '../model/chart-save-parameters';


@Injectable()
export class AirportChartService implements IAirportChartService {
    public constructor(private airportChartRepo: IAirportChartRepoService) {
    }

    public readAdChartById(chartId: number): Observable<AirportChart> {
        return this.airportChartRepo.readAdChartById(chartId);
    }


    public uploadAdChart(adIcao: string, chartUploadParameters: ChartUploadParameters): Observable<UploadedChartInfo> {
        return this.airportChartRepo.uploadAdChart(adIcao, chartUploadParameters);
    }


    public reprojectAndSaveAdChart(adIcao: string, chartSaveParameters: ChartSaveParameters): Observable<AirportChart> {
        return this.airportChartRepo.reprojectAndSaveAdChart(adIcao, chartSaveParameters);
    }

    public deleteAdChart(chartId: number): Observable<boolean> {
        return this.airportChartRepo.deleteAdChart(chartId);
    }
}
