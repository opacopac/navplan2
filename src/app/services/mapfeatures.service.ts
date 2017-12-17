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

const OVERSIZE_FACTOR = 1.2;
const MAPFEATURES_BASE_URL = environment.restApiBaseUrl + 'php/mapFeatures.php';
const USER_WP_BASE_URL = environment.restApiBaseUrl + 'php/userWaypoint.php';


// region INTERFACES

interface MapFeaturesResponse {
    navaids: NavaidRestItem[];
    airports: AirportRestItem[];
    airspaces: AirspaceItem[];
    reportingPoints: ReportingPointItem[];
    userPoints: UserPointItem[];
    webcams: WebcamItem[];
}


interface AirspaceItem {
    id: number;
    aip_id: number;
    category: string;
    country: string;
    name: string;
    alt: { top: AsAltitude, bottom: AsAltitude };
    polygon: string;
}

interface AsAltitude {
    ref: string;
    height: number;
    unit: string;
}


interface ReportingPointItem {
    id: number;
    type: string;
    airport_icao: string;
    name: string;
    heli: boolean;
    inbd_comp: boolean;
    outbd_comp: boolean;
    min_ft: number;
    max_ft: number;
    latitude: number;
    longitude: number;
    polygon: string;
}


interface UserPointItem {
    id: number;
    type: string;
    name: string;
    latitude: number;
    longitude: number;
    remark: string;
    supp_info: string;
}


interface WebcamItem {
    id: number;
    name: string;
    url: string;
    latitude: number;
    longitude: number;
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
        for (const adItem of response.airports) {
            mapFeatures.airports.push(new Airport(adItem));
        }

        // TODO

        return mapFeatures;
    }
}
