import {Observable} from 'rxjs';
import {AirportChart} from '../model/airport-chart';
import {IAirportChartService} from './i-airport-chart.service';
import {IAirportChartRepoService} from './i-airport-chart-repo.service';
import {Injectable} from '@angular/core';
import {UploadedChartInfo} from '../model/uploaded-chart-info';


@Injectable()
export class AirportChartService implements IAirportChartService {
    public constructor(private airportChartRepo: IAirportChartRepoService) {
    }


    public readAdChartById(chartId: number): Observable<AirportChart> {
        return this.airportChartRepo.readAdChartById(chartId);
    }


    public uploadAdChart(file: File): Observable<UploadedChartInfo> {
        return this.airportChartRepo.uploadAdChart(file);
    }
}
