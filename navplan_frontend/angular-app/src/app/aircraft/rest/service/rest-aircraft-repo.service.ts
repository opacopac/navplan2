import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../../../user/domain/model/user';
import {AircraftListEntry} from '../../domain/model/aircraft-list-entry';
import {Aircraft} from '../../domain/model/aircraft';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {SpeedUnit} from '../../../geo-physics/domain/model/quantities/speed-unit';
import {Consumption} from '../../../geo-physics/domain/model/quantities/consumption';
import {ConsumptionUnit} from '../../../geo-physics/domain/model/quantities/consumption-unit';
import {IAircraftRepoService} from '../../domain/service/i-aircraft-repo.service';


@Injectable()
export class RestAircraftRepoService implements IAircraftRepoService {
    constructor(
        private http: HttpClient) {
    }


    // region aircraft list

    public readAircraftList(user: User): Observable<AircraftListEntry[]> {
        const mockAircraftList = [
            new AircraftListEntry(1, 'HB-KGO', 'BR23', new Speed(100, SpeedUnit.KT), new Consumption(25, ConsumptionUnit.L_PER_H)),
            new AircraftListEntry(2, 'HB-KGP', 'BR23', new Speed(100, SpeedUnit.KT), new Consumption(25, ConsumptionUnit.L_PER_H)),
            new AircraftListEntry(3, 'HB-KGN', 'BR23', new Speed(100, SpeedUnit.KT), new Consumption(25, ConsumptionUnit.L_PER_H)),
        ];

        return of(mockAircraftList);

        /*const url: string = environment.flightrouteServiceUrl + '?token=' + user.token;
        return this.http
            .get<IRestFlightrouteListResponse>(url, {observe: 'response'})
            .pipe(
                map((response) => RestFlightrouteListConverter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading flight route list', err);
                    return throwError(err);
                })
            );*/
    }

    // endregion


    // region aircraft CRUD

    public readAircraft(aircraftId: number, user: User): Observable<Aircraft> {
        const mockAircraft = new Aircraft(1, 'HB-KGO', 'BR23');
        return of(mockAircraft);

        /*const url = environment.flightrouteServiceUrl + '?id=' + flightrouteId + '&token=' + user.token;
        // let message: string;

        return this.http
            .get<IRestFlightrouteResponse>(url, {observe: 'response'})
            .pipe(
                map((response) => RestFlightrouteResponseConverter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading flight route', err);
                    return throwError(err);
                })
            );*/
    }


    /*public saveFlightroute(flightroute: Flightroute, user: User): Observable<Flightroute> {
        const requestBody = {
            navplan: RestFlightrouteConverter.toRest(flightroute),
            token: user.token
        };
        if (flightroute.id > 0) {
            return this.http
                .put<IRestFlightrouteResponse>(environment.flightrouteServiceUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                    map(response => RestFlightrouteConverter.fromRest(response.body.navplan))
                );
        } else {
            return this.http
                .post<IRestFlightrouteResponse>(environment.flightrouteServiceUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                    map(response => RestFlightrouteConverter.fromRest(response.body.navplan))
                );
        }
    }


    public duplicateFlightroute(flightroute: Flightroute, user: User): Observable<Flightroute> {
        const requestBody = {
            navplan: RestFlightrouteConverter.toRest(flightroute),
            token: user.token
        };
        return this.http
            .post<IRestFlightrouteResponse>(environment.flightrouteServiceUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                map(response => RestFlightrouteConverter.fromRest(response.body.navplan))
            );
    }


    public deleteFlightroute(flightrouteId: number, user: User): Observable<boolean> {
        const url = environment.flightrouteServiceUrl + '?id=' + flightrouteId + '&token=' + user.token;

        return this.http
            .delete<IRestSuccessResponse>(url, {observe: 'response'})
            .pipe(
                map((response) => response.body.success),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading flight route', err);
                    return throwError(err);
                })
            );
    }*/

    // endregion
}
