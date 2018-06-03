import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../utils/logging.service';
import { SessionService } from '../utils/session.service';
import { Sessioncontext } from '../../model/sessioncontext';
import { Extent } from '../../model/ol-model/extent';
import { Mapfeatures } from '../../model/mapfeatures';
import { CachingExtentLoader } from './caching-extent-loader';
import { MapFeaturesResponse, RestMapperMapfeatures } from "../../model/rest-model/rest-mapper-mapfeatures";
import { Position2d } from "../../model/position";
import { DataItem } from "../../model/data-item";


const MAPFEATURES_BASE_URL = environment.restApiBaseUrl + 'php/search/SearchService.php';
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


    public findFlightrouteFeatureByPosition(position: Position2d, precisionDigits = 4): DataItem {
        // iterate over all cache items
        for (let cacheItem of this.cacheItemList) {
            const mapFeatures = (cacheItem.item as Mapfeatures);

            // search airports
            for (let airport of mapFeatures.airports) {
                if (airport.position.equals(position, precisionDigits)) {
                    return airport;
                }
            }

            // search navaids
            for (let navaid of mapFeatures.navaids) {
                if (navaid.position.equals(position, precisionDigits)) {
                    return navaid;
                }
            }

            // search user points
            for (let userpoint of mapFeatures.userpoints) {
                if (userpoint.position.equals(position, precisionDigits)) {
                    return userpoint;
                }
            }


            // search reporting point
            for (let reportingpoint of mapFeatures.reportingpoints) {
                if (reportingpoint.position.equals(position, precisionDigits)) {
                    return reportingpoint;
                }
            }

            // search reporting sectors
            for (let reportingsector of mapFeatures.reportingsectors) {
                if (reportingsector.polygon.containsPoint(position)) {
                    return reportingsector;
                }
            }
        }

        return undefined;
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
        this.http
            .jsonp<MapFeaturesResponse>(this.buildRequestUrl(extent, zoom), 'callback')
            .subscribe(
                response => {
                    const mapFeatures = RestMapperMapfeatures.getMapFeaturesFromResponse(response);
                    successCallback(mapFeatures);
                },
                err => {
                    const message = 'ERROR reading map features!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
                }
            );
    }


    private buildRequestUrl(extent: Extent, zoom: number): string {
        let url = MAPFEATURES_BASE_URL + '?action=searchByExtent' + '&minlon=' + extent[0] + '&minlat=' + extent[1]
            + '&maxlon=' + extent[2] + '&maxlat=' + extent[3] + '&zoom=' + zoom;
        url += '&searchItems=airports,navaids,airspaces';
        if (zoom >= 10) {
            url += ',webcams';
        }
        if (zoom >= 11) {
            url += ',reportingpoints,userpoints';
        }
        if (this.sessionService.isLoggedIn()) {
            url += '&email=' + this.session.user.email + '&token=' + this.session.user.token;
        }
        return url;
    }
}
