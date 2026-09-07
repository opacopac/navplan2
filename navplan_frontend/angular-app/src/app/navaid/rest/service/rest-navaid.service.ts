import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {Navaid} from '../../domain/model/navaid';
import {IRestNavaid} from '../model/i-rest-navaid';
import {RestNavaidConverter} from '../model/rest-navaid-converter';
import {INavaidRepo} from '../../domain/service/i-navaid-repo';
import {RestReadByExtentService} from '../../../common/rest/service/rest-read-by-extent.service';


@Injectable()
export class RestNavaidService extends RestReadByExtentService<Navaid, IRestNavaid> implements INavaidRepo {
    constructor(http: HttpClient) {
        super(http, environment.navaidApiBaseUrl, 'ERROR reading navaid list by extent');
    }


    public readNavaidsByExtent(extent: Extent2d, zoom: number): Observable<Navaid[]> {
        return this.readByExtent(extent, zoom);
    }


    protected convertList(restItems: IRestNavaid[]): Navaid[] {
        return RestNavaidConverter.fromRestList(restItems);
    }
}
