import {SearchItemList} from '../domain-model/search-item-list';
import {IRestAirport} from '../../open-aip/rest-model/i-rest-airport';
import {IRestNavaid} from '../../open-aip/rest-model/i-rest-navaid';
import {IRestAirspace} from '../../open-aip/rest-model/i-rest-airspace';
import {IRestReportingpoint} from '../../open-aip/rest-model/i-rest-reportingpoint';
import {IRestUserpoint} from '../../open-aip/rest-model/i-rest-userpoint';
import {IRestWebcam} from '../../open-aip/rest-model/i-rest-webcam';
import {IRestGeoname} from '../../open-aip/rest-model/i-rest-geoname';
import {IRestNotam} from '../../notam/rest-model/i-rest-notam';
import {AirportConverter} from '../../open-aip/rest-model/airport-converter';
import {NavaidConverter} from '../../open-aip/rest-model/navaid-converter';
import {ReportingpointConverter} from '../../open-aip/rest-model/reportingpoint-converter';
import {ReportingsectorConverter} from '../../open-aip/rest-model/reportingsector-converter';
import {UserpointConverter} from '../../open-aip/rest-model/userpoint-converter';
import {GeonameConverter} from '../../open-aip/rest-model/geoname-converter';
import {IRestCircuit} from '../../circuits/rest-model/i-rest-circuit';
import {CircuitConverter} from '../../circuits/rest-model/circuit-converter';


export interface SearchResponse {
    airports: IRestAirport[];
    navaids: IRestNavaid[];
    airspaces: IRestAirspace[];
    reportingpoints: IRestReportingpoint[];
    userpoints: IRestUserpoint[];
    webcams: IRestWebcam[];
    geonames: IRestGeoname[];
    notams: IRestNotam[];
    circuits: IRestCircuit[];
}


export class RestMapperSearch {
    public static getSearchItemListFromResponse(response: SearchResponse): SearchItemList {
        const searchItemList = new SearchItemList();

        for (const restItem of response.airports) {
            searchItemList.appendSearchItem(AirportConverter.fromRest(restItem));
        }

        for (const restItem of response.navaids) {
            searchItemList.appendSearchItem(NavaidConverter.fromRest(restItem));
        }

        for (const restItem of response.reportingpoints) {
            switch (restItem.type) {
                case 'POINT':
                    searchItemList.appendSearchItem(ReportingpointConverter.fromRest(restItem));
                    break;
                case 'SECTOR':
                    searchItemList.appendSearchItem(ReportingsectorConverter.fromRest(restItem));
                    break;
            }
        }

        for (const restItem of response.userpoints) {
            searchItemList.appendSearchItem(UserpointConverter.fromRest(restItem));
        }

        for (const restItem of response.geonames) {
            searchItemList.appendSearchItem(GeonameConverter.fromRest(restItem));
        }

        for (const restItem of response.circuits) {
            searchItemList.appendSearchItem(CircuitConverter.fromRest(restItem));
        }

        return searchItemList;
    }
}
