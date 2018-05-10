import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../utils/logging.service';
import { SessionService } from '../utils/session.service';
import { Sessioncontext } from '../../model/sessioncontext';
import { Extent } from '../../model/ol-model/extent';
import { Mapfeatures } from '../../model/mapfeatures';
import { CachingExtentLoader } from './caching-extent-loader';
import { NavaidRestItem, RestMapperNavaid } from '../../model/rest-model/rest-mapper-navaid';
import { AirportRestItem, RestMapperAirport } from '../../model/rest-model/rest-mapper-airport';
import { AirspaceRestItem, RestMapperAirspace } from '../../model/rest-model/rest-mapper-airspace';
import { ReportingPointRestItem, RestMapperReportingpoint } from '../../model/rest-model/rest-mapper-reportingpoint';
import { RestMapperUserpoint, UserPointRestItem } from '../../model/rest-model/rest-mapper-userpoint';
import { RestMapperWebcam, WebcamRestItem } from '../../model/rest-model/rest-mapper-webcam';


const MAPFEATURES_BASE_URL = environment.restApiBaseUrl + 'php/mapFeatures.php';
const USER_WP_BASE_URL = environment.restApiBaseUrl + 'php/userWaypoint.php';


export interface MapFeaturesResponse {
    navaids: NavaidRestItem[];
    airports: AirportRestItem[];
    airspaces: AirspaceRestItem[];
    reportingPoints: ReportingPointRestItem[];
    userPoints: UserPointRestItem[];
    webcams: WebcamRestItem[];
}


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
        return environment.mapOversizeFactor;
    }


    public isTimedOut(ageSec: number): boolean {
        return false;
    }


    protected loadFromSource(
        extent: Extent,
        zoom: number,
        successCallback: (Mapfeatures) => void,
        errorCallback: (string) => void) {

        let url = MAPFEATURES_BASE_URL + '?minlon=' + extent[0] + '&minlat=' + extent[1] + '&maxlon=' + extent[2]
            + '&maxlat=' + extent[3] + '&zoom=' + zoom;

        if (this.sessionService.isLoggedIn()) {
            url += '&email=' + this.session.user.email + '&token=' + this.session.user.token;
        }

        this.http
            .jsonp<MapFeaturesResponse>(url, 'callback')
            .subscribe(
                response => {
                    const mapFeatures = this.getMapFeaturesFromResponse(response);
                    successCallback(mapFeatures);
                },
                err => {
                    const message = 'ERROR reading map features!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
                }
            );
    }


    private getMapFeaturesFromResponse(response: MapFeaturesResponse): Mapfeatures {
        const mapFeatures = new Mapfeatures();

        // navaids
        for (const restItem of response.navaids) {
            mapFeatures.navaids.push(RestMapperNavaid.getNavaidFromRestItem(restItem));
        }

        // airports
        for (const restItem of response.airports) {
            mapFeatures.airports.push(RestMapperAirport.getAirportFromRestItem(restItem));
        }

        // airspaces
        for (const key in response.airspaces) {
            mapFeatures.airspaces.push(RestMapperAirspace.getAirspaceFromRestItem(response.airspaces[key]));
        }

        // reporting points
        for (const subRestItem of response.reportingPoints) {
            switch (subRestItem.type) {
                case 'POINT':
                    mapFeatures.reportingpoints.push(RestMapperReportingpoint.getReportingpointFromRestItem(subRestItem));
                    break;
                case 'SECTOR':
                    mapFeatures.reportingsectors.push(RestMapperReportingpoint.getReportingSectorFromRestItem(subRestItem));
                    break;
            }
        }

        // user points
        for (const subRestItem of response.userPoints) {
            mapFeatures.userpoints.push(RestMapperUserpoint.getUserpointFromRestItem(subRestItem));
        }

        // webcams
        for (const subRestItem of response.webcams) {
            mapFeatures.webcams.push(RestMapperWebcam.getWebcamFromRestItem(subRestItem));
        }

        return mapFeatures;
    }
}
