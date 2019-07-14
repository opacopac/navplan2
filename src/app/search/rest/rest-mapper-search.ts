import {SearchItemList} from '../domain/search-item-list';
import {IRestAirport} from '../../open-aip/rest/i-rest-airport';
import {IRestNavaid} from '../../open-aip/rest/i-rest-navaid';
import {IRestAirspace} from '../../open-aip/rest/i-rest-airspace';
import {IRestReportingpoint} from '../../open-aip/rest/i-rest-reportingpoint';
import {IRestUserpoint} from '../../open-aip/rest/i-rest-userpoint';
import {IRestWebcam} from '../../open-aip/rest/i-rest-webcam';
import {IRestGeoname} from '../../open-aip/rest/i-rest-geoname';
import {IRestNotam} from '../../notam/rest/i-rest-notam';
import {RestMapperAirport} from '../../open-aip/rest/rest-mapper-airport';
import {RestMapperNavaid} from '../../open-aip/rest/rest-mapper-navaid';
import {RestMapperReportingpoint} from '../../open-aip/rest/rest-mapper-reportingpoint';
import {RestMapperReportingsector} from '../../open-aip/rest/rest-mapper-reportingsector';
import {RestMapperUserpoint} from '../../open-aip/rest/rest-mapper-userpoint';
import {RestMapperGeoname} from '../../open-aip/rest/rest-mapper-geoname';


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
            searchItemList.appendSearchItem(RestMapperAirport.fromRest(restItem));
        }

        for (const restItem of response.navaids) {
            searchItemList.appendSearchItem(RestMapperNavaid.fromRest(restItem));
        }

        for (const restItem of response.reportingpoints) {
            switch (restItem.type) {
                case 'POINT':
                    searchItemList.appendSearchItem(RestMapperReportingpoint.fromRest(restItem));
                    break;
                case 'SECTOR':
                    searchItemList.appendSearchItem(RestMapperReportingsector.fromRest(restItem));
                    break;
            }
        }

        for (const restItem of response.userpoints) {
            searchItemList.appendSearchItem(RestMapperUserpoint.fromRest(restItem));
        }

        for (const restItem of response.geonames) {
            searchItemList.appendSearchItem(RestMapperGeoname.fromRest(restItem));
        }

        return searchItemList;
    }
}
