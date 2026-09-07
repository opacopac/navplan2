import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {Airspace} from '../../domain/model/airspace';
import {IRestAirspace} from '../model/i-rest-airspace';
import {RestAirspaceConverter} from '../model/rest-airspace-converter';
import {IAirspaceRepo} from '../../domain/service/i-airspace-repo';
import {RestReadByExtentService} from '../../../common/rest/service/rest-read-by-extent.service';


@Injectable()
export class RestAirspaceService extends RestReadByExtentService<Airspace, IRestAirspace> implements IAirspaceRepo {
    constructor(http: HttpClient) {
        super(http, environment.airspaceApiBaseUrl, 'ERROR reading airspace list by extent');
    }


    public readAirspacesByExtent(extent: Extent2d, zoom: number): Observable<Airspace[]> {
        return this.readByExtent(extent, zoom);
    }


    protected convertList(restItems: IRestAirspace[]): Airspace[] {
        return RestAirspaceConverter.fromRestList(restItems);
    }
}
