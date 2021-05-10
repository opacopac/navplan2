import {SearchItemList} from '../domain-model/search-item-list';
import {IRestAirport} from '../../airport/rest-model/i-rest-airport';
import {IRestNavaid} from '../../navaid/rest-model/i-rest-navaid';
import {IRestAirspace} from '../../airspace/rest-model/i-rest-airspace';
import {IRestReportingpoint} from '../../airport/rest-model/i-rest-reportingpoint';
import {IRestUserpoint} from '../../user/rest-model/i-rest-userpoint';
import {IRestWebcam} from '../../webcam/rest-model/i-rest-webcam';
import {IRestGeoname} from '../../geoname/rest-model/i-rest-geoname';
import {IRestNotam} from '../../notam/rest-model/i-rest-notam';
import {RestAirportConverter} from '../../airport/rest-model/rest-airport-converter';
import {RestNavaidConverter} from '../../navaid/rest-model/rest-navaid-converter';
import {RestReportingpointConverter} from '../../airport/rest-model/rest-reportingpoint-converter';
import {RestReportingsectorConverter} from '../../airport/rest-model/rest-reportingsector-converter';
import {RestUserpointConverter} from '../../user/rest-model/rest-userpoint-converter';
import {RestGeonameConverter} from '../../geoname/rest-model/rest-geoname-converter';
import {IRestAirportCircuit} from '../../airport/rest-model/i-rest-airport-circuit';
import {RestAirportCircuitConverter} from '../../airport/rest-model/rest-airport-circuit-converter';


export interface SearchResponse {
    airports: IRestAirport[];
    navaids: IRestNavaid[];
    airspaces: IRestAirspace[];
    reportingpoints: IRestReportingpoint[];
    userpoints: IRestUserpoint[];
    webcams: IRestWebcam[];
    geonames: IRestGeoname[];
    notams: IRestNotam[];
    circuits: IRestAirportCircuit[];
}


export class RestMapperSearch {
    public static getSearchItemListFromResponse(response: SearchResponse): SearchItemList {
        const searchItemList = new SearchItemList();

        for (const restItem of response.airports) {
            searchItemList.appendSearchItem(RestAirportConverter.fromRest(restItem));
        }

        for (const restItem of response.navaids) {
            searchItemList.appendSearchItem(RestNavaidConverter.fromRest(restItem));
        }

        for (const restItem of response.reportingpoints) {
            switch (restItem.type) {
                case 'POINT':
                    searchItemList.appendSearchItem(RestReportingpointConverter.fromRest(restItem));
                    break;
                case 'SECTOR':
                    searchItemList.appendSearchItem(RestReportingsectorConverter.fromRest(restItem));
                    break;
            }
        }

        for (const restItem of response.userpoints) {
            searchItemList.appendSearchItem(RestUserpointConverter.fromRest(restItem));
        }

        for (const restItem of response.geonames) {
            searchItemList.appendSearchItem(RestGeonameConverter.fromRest(restItem));
        }

        for (const restItem of response.circuits) {
            searchItemList.appendSearchItem(RestAirportCircuitConverter.fromRest(restItem));
        }

        return searchItemList;
    }
}
