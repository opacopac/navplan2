import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AirportChart2} from '../domain-model/airport-chart2';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {ShortAirport} from '../domain-model/short-airport';
import {Airport} from '../domain-model/airport';
import {ReportingPointsAndSectors} from '../domain-model/reporting-points-and-sectors';
import {of} from 'rxjs/internal/observable/of';
import {AirportCircuit} from '../domain-model/airport-circuit';
import {AirportRestService} from '../rest-service/airport-rest.service';
import {AirportState} from '../domain-model/airport-state';


@Injectable()
export class AirportService {
    private readonly REPORTING_POINT_MIN_ZOOM = 11;
    private readonly AD_CIRCUIT_MIN_ZOOM = 12;


    constructor(private airportRestService: AirportRestService) {
    }


    public readAirportsByExtent(extent: Extent2d, zoom: number): Observable<ShortAirport[]> {
        return this.airportRestService.readAirportsByExtent(extent, zoom);
    }


    public readAirportCircuitsByExtent(extent: Extent2d, zoom: number): Observable<AirportCircuit[]> {
        if (zoom < this.AD_CIRCUIT_MIN_ZOOM) {
            return of([]);
        }

        return this.airportRestService.readAirportCircuitsByExtent(extent, zoom);
    }


    public readReportingPointsByExtent(extent: Extent2d, zoom: number): Observable<ReportingPointsAndSectors> {
        if (zoom < this.REPORTING_POINT_MIN_ZOOM) {
            return of(new ReportingPointsAndSectors([], []));
        }

        return this.airportRestService.readReportingPointsByExtent(extent, zoom);
    }


    public readAirportById(id: number): Observable<Airport> {
        return this.airportRestService.readAirportById(id);
    }


    public readAdChartById(chartId: number): Observable<AirportChart2> {
        return this.airportRestService.readAdChartById(chartId);
    }


    public findAirportInState(icao: string, airportState: AirportState): ShortAirport {
        if (!icao) {
            return undefined;
        }

        const results = airportState.airports
            .filter(airport => airport.icao === icao);

        return results.length > 0 ? results[0] : undefined;
    }
}
