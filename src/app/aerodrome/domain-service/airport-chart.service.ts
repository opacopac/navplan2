import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AirportChart} from '../domain-model/airport-chart';
import {IAirportChartService} from './i-airport-chart.service';
import {IAirportChartRepo} from './i-airport-chart-repo';


@Injectable()
export class AirportChartService implements IAirportChartService {
    constructor(private airportChartRepo: IAirportChartRepo) {
    }


    public readAdChartById(chartId: number): Observable<AirportChart> {
        return this.airportChartRepo.readAdChartById(chartId);
    }
}
