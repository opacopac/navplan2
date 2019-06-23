import {MetarTafList} from '../domain/metar-taf';
import {IRestMetarTafResponse} from './i-rest-metar-taf-response';
import {RestMetarTaf} from './rest-metar-taf';


export class RestMetarTafList {
    public static fromRest(response: IRestMetarTafResponse): MetarTafList {
        const metarTafList: MetarTafList = new MetarTafList();

        for (const metarTafRestItem of response.features) {
            const metarTaf = RestMetarTaf.fromRest(metarTafRestItem);
            metarTafList.items.push(metarTaf);
        }

        return metarTafList;
    }
}
