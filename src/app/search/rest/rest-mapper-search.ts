import {SearchItemList} from '../domain/search-item-list';
import {IRestAirport} from '../../open-aip/rest/i-rest-airport';
import {IRestNavaid} from '../../open-aip/rest/i-rest-navaid';
import {IRestAirspace} from '../../open-aip/rest/i-rest-airspace';
import {IRestReportingpoint} from '../../open-aip/rest/i-rest-reportingpoint';
import {IRestUserpoint} from '../../open-aip/rest/i-rest-userpoint';
import {IRestWebcam} from '../../open-aip/rest/i-rest-webcam';
import {IRestGeoname} from '../../open-aip/rest/i-rest-geoname';
import {IRestNotam} from '../../notam/rest/i-rest-notam';
import {RestAirport} from '../../open-aip/rest/rest-airport';
import {RestNavaid} from '../../open-aip/rest/rest-navaid';
import {RestReportingpoint} from '../../open-aip/rest/rest-reportingpoint';
import {RestReportingsector} from '../../open-aip/rest/rest-reportingsector';
import {RestUserpoint} from '../../open-aip/rest/rest-userpoint';
import {RestGeoname} from '../../open-aip/rest/rest-geoname';


export interface SearchResponse {
    airports: IRestAirport[];
    navaids: IRestNavaid[];
    airspaces: IRestAirspace[];
    reportingpoints: IRestReportingpoint[];
    userpoints: IRestUserpoint[];
    webcams: IRestWebcam[];
    geonames: IRestGeoname[];
    notams: IRestNotam[];
}


export class RestMapperSearch {
    public static getSearchItemListFromResponse(response: SearchResponse): SearchItemList {
        const searchItemList = new SearchItemList();

        for (const restItem of response.airports) {
            searchItemList.appendSearchItem(RestAirport.fromRest(restItem));
        }

        for (const restItem of response.navaids) {
            searchItemList.appendSearchItem(RestNavaid.fromRest(restItem));
        }

        for (const restItem of response.reportingpoints) {
            switch (restItem.type) {
                case 'POINT':
                    searchItemList.appendSearchItem(RestReportingpoint.fromRest(restItem));
                    break;
                case 'SECTOR':
                    searchItemList.appendSearchItem(RestReportingsector.fromRest(restItem));
                    break;
            }
        }

        for (const restItem of response.userpoints) {
            searchItemList.appendSearchItem(RestUserpoint.fromRest(restItem));
        }

        for (const restItem of response.geonames) {
            searchItemList.appendSearchItem(RestGeoname.fromRest(restItem));
        }

        return searchItemList;
    }
}
