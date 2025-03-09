import {Observable} from 'rxjs';
import {AirportChart} from '../model/airport-chart';
import {IAirportChartService} from './i-airport-chart.service';
import {IAirportChartRepoService} from './i-airport-chart-repo.service';
import {Injectable} from '@angular/core';


@Injectable()
export class AirportChartService implements IAirportChartService {
    public constructor(private airportChartRepo: IAirportChartRepoService) {
    }


    public readAdChartById(chartId: number): Observable<AirportChart> {
        return this.airportChartRepo.readAdChartById(chartId);
    }
}
