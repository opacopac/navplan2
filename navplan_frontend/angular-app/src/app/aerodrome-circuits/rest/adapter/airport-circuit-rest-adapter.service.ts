import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {AirportCircuit} from '../../domain/model/airport-circuit';
import {RestAirportCircuitConverter} from '../converter/rest-airport-circuit-converter';
import {IRestAirportCircuit} from '../model/i-rest-airport-circuit';
import {IAirportCircuitRepoService} from '../../domain/service/i-airport-circuit-repo.service';
import {RestReadByExtentService} from '../../../common/rest/service/rest-read-by-extent.service';


@Injectable()
export class AirportCircuitRestAdapterService extends RestReadByExtentService<AirportCircuit, IRestAirportCircuit> implements IAirportCircuitRepoService {
    constructor(http: HttpClient) {
        super(http, environment.airportCircuitApiBaseUrl, 'ERROR reading airport circuits by extent');
    }


    public readAirportCircuitsByExtent(extent: Extent2d, zoom: number): Observable<AirportCircuit[]> {
        return this.readByExtent(extent, zoom);
    }


    protected convertList(restItems: IRestAirportCircuit[]): AirportCircuit[] {
        return RestAirportCircuitConverter.fromRestList(restItems);
    }
}
