import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoggingService } from './logging.service';
import { SessionService } from './session.service';
import { Sessioncontext } from '../model/sessioncontext';
import { Extent } from '../model/ol-model/extent';
import { Mapfeatures, MapFeaturesResponse } from '../model/mapfeatures';
import { CachingExtentLoader } from "./caching-extent-loader";


const OVERSIZE_FACTOR = 1.2;
const MAPFEATURES_BASE_URL = environment.restApiBaseUrl + 'php/mapFeatures.php';
const USER_WP_BASE_URL = environment.restApiBaseUrl + 'php/userWaypoint.php';



@Injectable()
export class MapfeaturesService extends CachingExtentLoader<Mapfeatures> {
    private session: Sessioncontext;


    constructor(
        private http: HttpClient,
        private sessionService: SessionService) {

        super();
        this.session = sessionService.getSessionContext();
    }


    public getOversizeFactor(): number {
        return OVERSIZE_FACTOR;
    }


    public getMaxAgeSec(): number {
        return undefined;
    }


    protected loadFromSource(
        extent: Extent,
        successCallback: (Mapfeatures) => void,
        errorCallback: (string) => void) {

        let url = MAPFEATURES_BASE_URL + '?minlon=' + extent[0] + '&minlat=' + extent[1] + '&maxlon=' + extent[2] + '&maxlat=' + extent[3];

        if (this.sessionService.isLoggedIn()) {
            url += '&email=' + this.session.user.email + '&token=' + this.session.user.token;
        }


        this.http
            .jsonp<MapFeaturesResponse>(url, 'callback')
            .subscribe(
                response => {
                    const mapFeatures = new Mapfeatures(response);
                    successCallback(mapFeatures);
                },
                err => {
                    const message = 'ERROR reading map features!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
                }
            );
    }
}
