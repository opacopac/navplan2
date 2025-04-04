import {SearchItemList} from '../../domain/model/search-item-list';
import {RestAirportConverter} from '../../../aerodrome/rest/converter/rest-airport-converter';
import {RestNavaidConverter} from '../../../navaid/rest/model/rest-navaid-converter';
import {RestReportingpointConverter} from '../../../aerodrome/rest/converter/rest-reportingpoint-converter';
import {RestReportingsectorConverter} from '../../../aerodrome/rest/converter/rest-reportingsector-converter';
import {RestUserpointConverter} from '../../../user/rest/model/rest-userpoint-converter';
import {RestGeonameConverter} from '../../../geoname/rest/model/rest-geoname-converter';
import {RestAirportCircuitConverter} from '../../../aerodrome-circuits/rest/converter/rest-airport-circuit-converter';
import {IRestSearchResponse} from './i-rest-search-response';
import {RestAirspaceConverter} from '../../../airspace/rest/model/rest-airspace-converter';


export class RestSearchResponseConverter {
    public static fromRest(response: IRestSearchResponse): SearchItemList {
        const searchItemList = new SearchItemList();

        for (const restItem of response.airports) {
            searchItemList.appendSearchItem(RestAirportConverter.fromRest(restItem));
        }

        for (const restItem of response.navaids) {
            searchItemList.appendSearchItem(RestNavaidConverter.fromRest(restItem));
        }

        for (const restItem of response.airspaces) {
            searchItemList.appendSearchItem(RestAirspaceConverter.fromRest(restItem));
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
