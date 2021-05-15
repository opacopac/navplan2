import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AirportChart} from '../domain-model/airport-chart';
import {AirportChartRestService} from '../rest-service/airport-chart-rest.service';


@Injectable()
export class AirportChartService {
    constructor(private airportChartRestService: AirportChartRestService) {
    }


    public readAdChartById(chartId: number): Observable<AirportChart> {
        return this.airportChartRestService.readAdChartById(chartId);
    }
}
