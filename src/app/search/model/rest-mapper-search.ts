import {NotamRestItem} from '../../notam/model/rest-mapper-notam';
import {WebcamRestItem} from '../../map-features/model/rest-mapper/rest-mapper-webcam';
import {NavaidRestItem, RestMapperNavaid} from '../../map-features/model/rest-mapper/rest-mapper-navaid';
import {ReportingPointRestItem, RestMapperReportingpoint} from '../../map-features/model/rest-mapper/rest-mapper-reportingpoint';
import {AirportRestItem, RestMapperAirport} from '../../map-features/model/rest-mapper/rest-mapper-airport';
import {AirspaceRestItem} from '../../map-features/model/rest-mapper/rest-mapper-airspace';
import {RestMapperUserpoint, UserPointRestItem} from '../../map-features/model/rest-mapper/rest-mapper-userpoint';
import {GeonameRestItem, RestMapperGeoname} from '../../map-features/model/rest-mapper/rest-mapper-geoname';
import {SearchItemList} from '../../search/model/search-item-list';


export interface SearchResponse {
    airports: AirportRestItem[];
    navaids: NavaidRestItem[];
    airspaces: AirspaceRestItem[];
    reportingpoints: ReportingPointRestItem[];
    userpoints: UserPointRestItem[];
    webcams: WebcamRestItem[];
    geonames: GeonameRestItem[];
    notams: NotamRestItem[];
}


export class RestMapperSearch {
    public static getSearchItemListFromResponse(response: SearchResponse): SearchItemList {
        const searchItemList = new SearchItemList();

        for (const restItem of response.airports) {
            searchItemList.appendSearchItem(RestMapperAirport.getAirportFromRestItem(restItem));
        }

        for (const restItem of response.navaids) {
            searchItemList.appendSearchItem(RestMapperNavaid.getNavaidFromRestItem(restItem));
        }

        for (const restItem of response.reportingpoints) {
            switch (restItem.type) {
                case 'POINT':
                    searchItemList.appendSearchItem(RestMapperReportingpoint.getReportingpointFromRestItem(restItem));
                    break;
                case 'SECTOR':
                    searchItemList.appendSearchItem(RestMapperReportingpoint.getReportingSectorFromRestItem(restItem));
                    break;
            }
        }

        for (const restItem of response.userpoints) {
            searchItemList.appendSearchItem(RestMapperUserpoint.getUserpointFromRestItem(restItem));
        }

        for (const restItem of response.geonames) {
            searchItemList.appendSearchItem(RestMapperGeoname.getGeonameFromRestItem(restItem));
        }

        return searchItemList;
    }
}
