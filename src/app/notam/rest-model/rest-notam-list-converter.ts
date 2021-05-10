import {IRestNotamResponse} from './i-rest-notam-response';
import {RestNotamConverter} from './rest-notam-converter';
import {NotamList} from '../domain-model/notam-list';


export class RestNotamListConverter {
    public static fromRest(response: IRestNotamResponse): NotamList {
        const notamList = new NotamList();
        notamList.items = response.notams
            .map(restNotam => RestNotamConverter.fromRest(restNotam));

        return notamList;
    }
}
