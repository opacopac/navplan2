import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../utils/logging.service';
import { SessionService } from '../utils/session.service';
import { Sessioncontext } from '../../model/sessioncontext';
import { Extent } from '../../model/ol-model/extent';
import { Mapfeatures } from '../../model/mapfeatures';
import { CachingExtentLoader } from './caching-extent-loader';
import { Reportingsector } from '../../model/reportingsector';
import { Airspace, AirspaceAltitude} from '../../model/airspace';
import { Airport, AirportRunway, AirportRadio, AirportWebcam, AirportChart, AirportFeature } from '../../model/airport';
import { Userpoint } from '../../model/userpoint';
import { Reportingpoint } from '../../model/reportingpoint';
import { Webcam } from '../../model/webcam';
import { Navaid } from '../../model/navaid';
import { Position2d } from '../../model/position';
import { Polygon } from '../../model/polygon';


const OVERSIZE_FACTOR = 1.2;
const MAPFEATURES_BASE_URL = environment.restApiBaseUrl + 'php/mapFeatures.php';
const USER_WP_BASE_URL = environment.restApiBaseUrl + 'php/userWaypoint.php';


// region interfaces

export interface MapFeaturesResponse {
    navaids: NavaidRestItem[];
    airports: AirportRestItem[];
    airspaces: AirspaceRestItem[];
    reportingPoints: ReportingPointRestItem[];
    userPoints: UserPointRestItem[];
    webcams: WebcamRestItem[];
}


export interface NavaidRestItem {
    id: number;
    type: string;
    kuerzel: string;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    frequency: string;
    unit: string;
    declination: number;
    truenorth: boolean;
}


export interface AirportRestItem {
    id: number;
    type: string;
    name: string;
    icao: string;
    country: string;
    latitude: number;
    longitude: number;
    elevation: number;
    runways: AirportRunwayRestItem[];
    radios: AirportRadioRestItem[];
    webcams: AirportWebcamRestItem[];
    charts: AirportChartRestItem[];
    mapfeatures: AirportFeatureRestItem[];
}


export interface AirportChartRestItem {
    id: number;
    source: string;
    type: string;
    filename: string;
    mercator_n: string;
    mercator_s: string;
    mercator_e: string;
    mercator_w: string;
}


export interface AirportRunwayRestItem {
    name: string;
    surface: string;
    length: number;
    width: number;
    direction1: number;
    direction2: number;
    tora1: number;
    tora2: number;
    lda1: number;
    lda2: number;
    papi1: boolean;
    papi2: boolean;
}


export interface AirportRadioRestItem {
    category: string;
    frequency: string;
    type: string;
    typespec: string;
    description: string;
}


export interface AirportFeatureRestItem {
    type: string;
    name: string;
}


export interface AirportWebcamRestItem {
    name: string;
    url: string;
}


export interface AirspaceRestItem {
    id: number;
    aip_id: number;
    category: string;
    country: string;
    name: string;
    alt: { top: AirspaceAltitudeRestItem, bottom: AirspaceAltitudeRestItem };
    polygon: [number, number][];
}


export interface AirspaceAltitudeRestItem {
    ref: string;
    height: number;
    unit: string;
}


export interface ReportingPointRestItem {
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
    polygon: [number, number][];
}


export interface UserPointRestItem {
    id: number;
    type: string;
    name: string;
    latitude: number;
    longitude: number;
    remark: string;
    supp_info: string;
}


export interface WebcamRestItem {
    id: number;
    name: string;
    url: string;
    latitude: number;
    longitude: number;
}

// endregion


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
            mapFeatures.navaids.push(this.getNavaidFromRestItem(restItem));
        }

        // airports
        for (const restItem of response.airports) {
            mapFeatures.airports.push(this.getAirportFromRestItem(restItem));
        }

        // airspaces
        for (const key in response.airspaces) {
            mapFeatures.airspaces.push(this.getAirspaceFromRestItem(response.airspaces[key]));
        }

        // reporting points
        for (const subRestItem of response.reportingPoints) {
            switch (subRestItem.type) {
                case 'POINT':
                    mapFeatures.reportingpoints.push(this.getReportingpointFromRestItem(subRestItem));
                    break;
                case 'SECTOR':
                    mapFeatures.reportingsectors.push(this.getReportingSectorFromRestItem(subRestItem));
                    break;
            }
        }

        // user points
        for (const subRestItem of response.userPoints) {
            mapFeatures.userpoints.push(this.getUserpointFromRestItem(subRestItem));
        }

        // webcams
        for (const subRestItem of response.webcams) {
            mapFeatures.webcams.push(this.getWebcamFromRestItem(subRestItem));
        }

        return mapFeatures;
    }


    private getNavaidFromRestItem(restItem: NavaidRestItem): Navaid {
        return new Navaid(
            restItem.id,
            restItem.type,
            restItem.kuerzel,
            restItem.name,
            new Position2d(restItem.longitude, restItem.latitude),
            restItem.elevation,
            restItem.frequency,
            restItem.unit,
            restItem.declination,
            restItem.truenorth);
    }


    private getAirportFromRestItem(restItem: AirportRestItem): Airport {
        const airport = new Airport(
            restItem.id,
            restItem.type,
            restItem.name,
            restItem.icao,
            restItem.country,
            new Position2d(restItem.longitude, restItem.latitude),
            restItem.elevation);

        for (const item of restItem.runways) {
            airport.runways.push(this.getAirportRunwayFromRestItem(item, airport.position, airport.isMilitary()));
        }

        for (const item of restItem.radios) {
            airport.radios.push(this.getAirportRadioFromRestItem(item));
        }

        for (const item of restItem.webcams) {
            airport.webcams.push(this.getAirportWebcamFromRestItem(item));
        }

        for (const item of restItem.charts) {
            airport.charts.push(this.getAirportChartFromRestItem(item));
        }

        for (const item of restItem.mapfeatures) {
            airport.features.push(this.getAirportFeatureFromRestItem(item, airport.position));
        }

        return airport;
    }


    private getAirportRunwayFromRestItem(restItem: AirportRunwayRestItem, position: Position2d, isMil: boolean): AirportRunway {
        return new AirportRunway(
            restItem.name,
            restItem.surface,
            restItem.length,
            restItem.width,
            restItem.direction1,
            restItem.direction2,
            restItem.tora1,
            restItem.tora2,
            restItem.lda1,
            restItem.lda2,
            restItem.papi1,
            restItem.papi2,
            position,
            isMil);
    }


    private getAirportRadioFromRestItem(restItem: AirportRadioRestItem): AirportRadio {
        return new AirportRadio(
            restItem.category,
            restItem.frequency,
            restItem.type,
            restItem.typespec,
            restItem.description
        );
    }


    private getAirportWebcamFromRestItem(restItem: AirportWebcamRestItem): AirportWebcam {
        return new AirportWebcam(
            restItem.name,
            restItem.url
        );
    }


    private getAirportChartFromRestItem(restItem: AirportChartRestItem): AirportChart {
        return new AirportChart(
            restItem.id,
            restItem.source,
            restItem.type,
            restItem.filename,
            restItem.mercator_n,
            restItem.mercator_s,
            restItem.mercator_e,
            restItem.mercator_w);
    }


    private getAirportFeatureFromRestItem(restItem: AirportFeatureRestItem, position: Position2d): AirportFeature {
        return new AirportFeature(
            restItem.type,
            restItem.name,
            position);
    }


    private getAirspaceFromRestItem(restItem: AirspaceRestItem): Airspace {
        return new Airspace(
            restItem.id,
            restItem.aip_id,
            restItem.category,
            restItem.country,
            restItem.name,
            { top: this.getAirspaceAltitudeFromRestItem(restItem.alt.top),
                bottom: this.getAirspaceAltitudeFromRestItem(restItem.alt.bottom) },
            Polygon.createFromLonLatList(restItem.polygon));
    }


    private getAirspaceAltitudeFromRestItem(restItem: AirspaceAltitudeRestItem): AirspaceAltitude {
        return new AirspaceAltitude(
            restItem.ref,
            restItem.height,
            restItem.unit);
    }


    private getReportingpointFromRestItem(restItem: ReportingPointRestItem): Reportingpoint {
        return new Reportingpoint(
            restItem.id,
            restItem.type,
            restItem.airport_icao,
            restItem.name,
            restItem.heli,
            restItem.inbd_comp,
            restItem.outbd_comp,
            restItem.min_ft,
            restItem.max_ft,
            new Position2d(restItem.longitude, restItem.latitude));
    }


    private getReportingSectorFromRestItem(restItem: ReportingPointRestItem): Reportingsector {
        return new Reportingsector(
            restItem.id,
            restItem.type,
            restItem.airport_icao,
            restItem.name,
            restItem.heli,
            restItem.inbd_comp,
            restItem.outbd_comp,
            restItem.min_ft,
            restItem.max_ft,
            Polygon.createFromLonLatList(restItem.polygon));
    }


    private getUserpointFromRestItem(restItem: UserPointRestItem): Userpoint {
        return new Userpoint(
            restItem.id,
            restItem.type,
            restItem.name,
            new Position2d(restItem.longitude, restItem.latitude),
            restItem.remark,
            restItem.supp_info);
    }


    private getWebcamFromRestItem(restItem: WebcamRestItem): Webcam {
        return new Webcam(
            restItem.id,
            restItem.name,
            restItem.url,
            new Position2d(restItem.longitude, restItem.latitude));
    }
}
