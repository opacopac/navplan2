import {MetarTafList} from '../domain-model/metar-taf';
import {IRestMetarTafResponse} from './i-rest-metar-taf-response';
import {MetarTafConverter} from './metar-taf-converter';


export class MetarTafListConverter {
    public static fromRest(response: IRestMetarTafResponse): MetarTafList {
        const metarTafList: MetarTafList = new MetarTafList();

        for (const metarTafRestItem of response.features) {
            const metarTaf = MetarTafConverter.fromRest(metarTafRestItem);
            metarTafList.items.push(metarTaf);
        }

        return metarTafList;
    }
}
