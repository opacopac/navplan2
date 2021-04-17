import {IRestNotamResponse} from './i-rest-notam-response';
import {NotamConverter} from './notam-converter';
import {NotamList} from '../domain-model/notam-list';


export class NotamListConverter {
    public static fromRest(response: IRestNotamResponse): NotamList {
        const notamList = new NotamList();
        notamList.items = response.notams
            .map(restNotam => NotamConverter.fromRest(restNotam));

        return notamList;
    }
}
