import {IRestNotamResponse} from './i-rest-notam-response';
import {RestNotam} from './rest-notam';
import {NotamList} from '../domain/notam-list';


export class RestNotamList {
    public static fromRest(response: IRestNotamResponse): NotamList {
        const notamList = new NotamList();
        notamList.items = response.notams
            .map(restNotam => RestNotam.fromRest(restNotam));

        return notamList;
    }
}
