import {RestAirportConverter} from '../../aerodrome-rest/rest-model/rest-airport-converter';
import {RestNavaidConverter} from '../../enroute-rest/rest-model/rest-navaid-converter';
import {RestReportingpointConverter} from '../../aerodrome-rest/rest-model/rest-reportingpoint-converter';
import {RestUserpointConverter} from '../../user/rest-model/rest-userpoint-converter';
import {RestGeonameConverter} from '../../geoname-rest/rest-model/rest-geoname-converter';
import {IRestSearchResponse} from './i-rest-search-response';
import {RestAirspaceConverter} from '../../enroute-rest/rest-model/rest-airspace-converter';
import {PositionSearchResultList} from '../domain-model/position-search-result-list';
import {AirportSearchResult} from '../domain-model/airport-search-result';
import {NavaidSearchResult} from '../domain-model/navaid-search-result';
import {ReportingPointSearchResult} from '../domain-model/reporting-point-search-result';
import {UserPointSearchResult} from '../domain-model/user-point-search-result';
import {GeonameSearchResult} from '../domain-model/geoname-search-result';
import {RestNotamConverter} from '../../notam/rest-model/rest-notam-converter';


export class RestPositionSearchResponseConverter {
    public static fromRest(response: IRestSearchResponse): PositionSearchResultList {
        return new PositionSearchResultList(
            response.airports.map(restAirport => new AirportSearchResult(RestAirportConverter.fromRest(restAirport))),
            response.navaids.map(restNavaid => new NavaidSearchResult(RestNavaidConverter.fromRest(restNavaid))),
            response.reportingpoints.map(restRp => new ReportingPointSearchResult(RestReportingpointConverter.fromRest(restRp))),
            response.userpoints.map(restUserpoint => new UserPointSearchResult(RestUserpointConverter.fromRest(restUserpoint))),
            response.geonames.map(restGeoname => new GeonameSearchResult(RestGeonameConverter.fromRest(restGeoname))),
            response.airspaces.map(restAirspace => RestAirspaceConverter.fromRest(restAirspace)),
            response.notams.map(restNotam => RestNotamConverter.fromRest(restNotam))
        );
    }
}
