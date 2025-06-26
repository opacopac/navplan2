import {IRestTokenResponse} from './i-rest-token-response';
import {User} from '../../domain/model/user';


export class RestUserConverter {
    public static fromRest(restItem: IRestTokenResponse): User {
        return new User(
            restItem.email,
            restItem.token,
            restItem.is_moderator
        );
    }
}
