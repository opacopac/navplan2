import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Extent} from '../../shared/model/extent';
import {Mapfeatures} from '../model/mapfeatures';
import {MapFeaturesResponse, RestMapperMapfeatures} from '../model/rest-mapper/rest-mapper-mapfeatures';
import {User} from '../../user/model/user';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {LoggingService} from '../../shared/services/logging/logging.service';


const MAPFEATURES_BASE_URL = environment.restApiBaseUrl + 'php/search/SearchService.php';


@Injectable()
export class MapfeaturesService  {
    constructor(private http: HttpClient) {
    }


    public load(
        extent: Extent,
        zoom: number,
        user: User): Observable<Mapfeatures> {
        return this.http
            .jsonp<MapFeaturesResponse>(this.buildRequestUrl(extent, zoom, user), 'callback')
            .pipe(
                map(response => RestMapperMapfeatures.getMapFeaturesFromResponse(response)),
                catchError((error, subject) => {
                    LoggingService.logResponseError('ERROR reading map features', error);
                    return subject;
                }),
            );


        /*.subscribe(
            response => {
                const mapFeatures = RestMapperMapfeatures.getMapFeaturesFromResponse(response);
                successCallback(mapFeatures);
            },
            err => {
                const message = 'ERROR reading map features!';
                LoggingService.logResponseError(message, err);
                errorCallback(message);
            }
        );*/
    }


    /*public findFlightrouteFeatureByPosition(position: Position2d, precisionDigits = 4): DataItem {
        // iterate over all cache items
        for (const cacheItem of this.cacheItemList) {
            const mapFeatures = (cacheItem.item as Mapfeatures);

            // search airports
            for (const airport of mapFeatures.airports) {
                if (airport.position.equals(position, precisionDigits)) {
                    return airport;
                }
            }

            // search navaids
            for (const navaid of mapFeatures.navaids) {
                if (navaid.position.equals(position, precisionDigits)) {
                    return navaid;
                }
            }

            // search user points
            for (const userpoint of mapFeatures.userpoints) {
                if (userpoint.position.equals(position, precisionDigits)) {
                    return userpoint;
                }
            }


            // search reporting point
            for (const reportingpoint of mapFeatures.reportingpoints) {
                if (reportingpoint.position.equals(position, precisionDigits)) {
                    return reportingpoint;
                }
            }

            // search reporting sectors
            for (const reportingsector of mapFeatures.reportingsectors) {
                if (reportingsector.polygon.containsPoint(position)) {
                    return reportingsector;
                }
            }
        }

        return undefined;
    }*/


    public getOversizeFactor(): number {
        return environment.mapOversizeFactor;
    }


    public isTimedOut(ageSec: number): boolean {
        return false;
    }


    private buildRequestUrl(extent: Extent, zoom: number, user: User): string {
        let url = MAPFEATURES_BASE_URL + '?action=searchByExtent' + '&minlon=' + extent[0] + '&minlat=' + extent[1]
            + '&maxlon=' + extent[2] + '&maxlat=' + extent[3] + '&zoom=' + zoom;
        url += '&searchItems=airports,navaids,airspaces';
        if (zoom >= 10) {
            url += ',webcams';
        }
        if (zoom >= 11) {
            url += ',reportingpoints,userpoints';
        }
        if (user) {
            url += '&email=' + user.email + '&token=' + user.token;
        }
        return url;
    }
}