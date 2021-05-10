import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {AirportChart2} from '../domain-model/airport-chart2';
import {IRestAirportChart2} from '../rest-model/i-rest-airport-chart2';
import {RestAirportChartConverter2} from '../rest-model/rest-airport-chart-converter2';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {ShortAirport} from '../domain-model/short-airport';
import {IRestShortAirport} from '../rest-model/i-rest-short-airport';
import {RestShortAirportConverter} from '../rest-model/rest-short-airport-converter';
import {Airport} from '../domain-model/airport';
import {IRestAirport} from '../rest-model/i-rest-airport';
import {RestAirportConverter} from '../rest-model/rest-airport-converter';
import {IRestReportingpoint} from '../rest-model/i-rest-reportingpoint';
import {RestReportingpointConverter} from '../rest-model/rest-reportingpoint-converter';
import {RestReportingsectorConverter} from '../rest-model/rest-reportingsector-converter';
import {ReportingPointsAndSectors} from '../domain-model/reporting-points-and-sectors';
import {of} from 'rxjs/internal/observable/of';
import {AirportCircuit} from '../domain-model/airport-circuit';
import {RestAirportCircuitConverter} from '../rest-model/rest-airport-circuit-converter';
import {IRestAirportCircuit} from '../rest-model/i-rest-airport-circuit';


@Injectable()
export class AirportService {
    private readonly REPORTING_POINT_MIN_ZOOM = 11;
    private readonly AD_CIRCUIT_MIN_ZOOM = 12;


    constructor(private http: HttpClient) {
    }


    public readAirportsByExtent(extent: Extent2d, zoom: number): Observable<ShortAirport[]> {
        const url: string = environment.airportServiceUrl + '?action=getShortAdByExtent'
            + '&minlon=' + extent.minLon
            + '&minlat=' + extent.minLat
            + '&maxlon=' + extent.maxLon
            + '&maxlat=' + extent.maxLat
            + '&zoom=' + zoom;

        return this.http
            .get<IRestShortAirport[]>(url, {observe: 'response'})
            .pipe(
                map((response) => RestShortAirportConverter.fromRestList(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport list by extent', err);
                    return throwError(err);
                })
            );
    }


    public readAirportCircuitsByExtent(extent: Extent2d, zoom: number): Observable<AirportCircuit[]> {
        if (zoom < this.AD_CIRCUIT_MIN_ZOOM) {
            return of([]);
        }

        const url: string = environment.airportServiceUrl + '?action=getAdCircuitsByExtent'
            + '&minlon=' + extent.minLon
            + '&minlat=' + extent.minLat
            + '&maxlon=' + extent.maxLon
            + '&maxlat=' + extent.maxLat
            + '&zoom=' + zoom;

        return this.http
            .get<IRestAirportCircuit[]>(url, {observe: 'response'})
            .pipe(
                map((response) => RestAirportCircuitConverter.fromRestList(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport circuits by extent', err);
                    return throwError(err);
                })
            );
    }


    public readReportingPointsByExtent(extent: Extent2d, zoom: number): Observable<ReportingPointsAndSectors> {
        if (zoom < this.REPORTING_POINT_MIN_ZOOM) {
            return of(new ReportingPointsAndSectors([], []));
        }

        const url: string = environment.airportServiceUrl + '?action=getRpByExtent'
            + '&minlon=' + extent.minLon
            + '&minlat=' + extent.minLat
            + '&maxlon=' + extent.maxLon
            + '&maxlat=' + extent.maxLat;

        return this.http
            .get<IRestReportingpoint[]>(url, {observe: 'response'})
            .pipe(
                map((response) => {
                    return new ReportingPointsAndSectors(
                        response.body
                            .filter(rp => rp.type === 'POINT')
                            .map(rp => RestReportingpointConverter.fromRest(rp)),
                        response.body
                            .filter(rp => rp.type === 'SECTOR')
                            .map(rp => RestReportingsectorConverter.fromRest(rp))
                    );
                }),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport list by extent', err);
                    return throwError(err);
                })
            );
    }


    public readAirportById(id: number): Observable<Airport> {
        const url: string = environment.airportServiceUrl + '?action=getAdById&id=' + id;

        return this.http
            .get<IRestAirport>(url, {observe: 'response'})
            .pipe(
                map((response) => RestAirportConverter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport by id', err);
                    return throwError(err);
                })
            );
    }


    public readAdChartById(chartId: number): Observable<AirportChart2> {
        const url: string = environment.airportServiceUrl + '?action=getChartById&id=' + chartId;

        return this.http
            .get<IRestAirportChart2>(url, {observe: 'response'})
            .pipe(
                map((response) => RestAirportChartConverter2.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport chart by id', err);
                    return throwError(err);
                })
            );
    }
}