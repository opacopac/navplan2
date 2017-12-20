import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoggingService } from './logging.service';
import { SessionService } from './session.service';
import { Sessioncontext } from '../model/sessioncontext';
import { Extent } from '../model/map/extent';
import { Mapfeatures } from '../model/map/mapfeatures';
import { Navaid, NavaidRestItem } from '../model/map/navaid';
import { Airport, AirportRestItem } from '../model/map/airport';
import { Airspace, AirspaceRestItem} from '../model/map/airspace';
import { Reportingpoint, ReportingPointRestItem } from '../model/map/reportingpoint';
import { Userpoint, UserPointRestItem } from '../model/map/userpoint';
import { Webcam, WebcamRestItem } from '../model/map/webcam';


const OVERSIZE_FACTOR = 1.2;
const MAPFEATURES_BASE_URL = environment.restApiBaseUrl + 'php/mapFeatures.php';
const USER_WP_BASE_URL = environment.restApiBaseUrl + 'php/userWaypoint.php';


// region INTERFACES

interface MapFeaturesResponse {
    navaids: NavaidRestItem[];
    airports: AirportRestItem[];
    airspaces: AirspaceRestItem[];
    reportingPoints: ReportingPointRestItem[];
    userPoints: UserPointRestItem[];
    webcams: WebcamRestItem[];
}


// endregion


@Injectable()
export class MapfeaturesService {
    private session: Sessioncontext;


    constructor(
        private http: HttpClient,
        private sessionService: SessionService) {

        this.session = sessionService.getSessionContext();
    }


    public getMapFeatures(
        extent: Extent,
        successCallback: (MapFeatures) => void,
        errorCallback: (string) => void) {

        // TODO: try to get from oversize cache

        this.loadMapFeatures(extent, successCallback, errorCallback);
    }


    private loadMapFeatures(
        extent: Extent,
        successCallback: (MapFeatures) => void,
        errorCallback: (string) => void) {

        let url = MAPFEATURES_BASE_URL + '?minlon=' + extent[0] + '&minlat=' + extent[1] + '&maxlon=' + extent[2] + '&maxlat=' + extent[3];

        if (this.sessionService.isLoggedIn()) {
            url += '&email=' + this.session.user.email + '&token=' + this.session.user.token;
        }


        this.http
            .get<MapFeaturesResponse>(url, {observe: 'response'})
            .subscribe(
                response => {
                    const mapFeatures = this.getMapFeaturesFromResponse(response.body);
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
        mapFeatures.navaids = [];
        for (const restItem of response.navaids) {
            mapFeatures.navaids.push(new Navaid(restItem));
        }

        // airports
        mapFeatures.airports = [];
        for (const restItem of response.airports) {
            mapFeatures.airports.push(new Airport(restItem));
        }

        // airspaces
        mapFeatures.airspaces = [];
        for (const key in response.airspaces) {
            mapFeatures.airspaces.push(new Airspace(response.airspaces[key]));
        }

        // reporting points
        mapFeatures.reportingpoints = [];
        for (const restItem of response.reportingPoints) {
            mapFeatures.reportingpoints.push(new Reportingpoint(restItem));
        }

        // user points
        mapFeatures.userpoints = [];
        for (const restItem of response.userPoints) {
            mapFeatures.userpoints.push(new Userpoint(restItem));
        }

        // webcams
        mapFeatures.webcams = [];
        for (const restItem of response.webcams) {
            mapFeatures.webcams.push(new Webcam(restItem));
        }

        return mapFeatures;
    }
}
