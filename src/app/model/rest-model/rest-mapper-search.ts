import {NotamRestItem} from "./rest-mapper-notam";
import {WebcamRestItem} from "./rest-mapper-webcam";
import {NavaidRestItem, RestMapperNavaid} from "./rest-mapper-navaid";
import {ReportingPointRestItem, RestMapperReportingpoint} from "./rest-mapper-reportingpoint";
import {AirportRestItem, RestMapperAirport} from "./rest-mapper-airport";
import {AirspaceRestItem} from "./rest-mapper-airspace";
import {RestMapperUserpoint, UserPointRestItem} from "./rest-mapper-userpoint";
import {GeonameRestItem, RestMapperGeoname} from "./rest-mapper-geoname";
import {SearchItemList} from "../search-item";


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
