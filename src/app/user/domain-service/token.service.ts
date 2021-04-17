import {UserToken} from '../domain-model/user-token';
import {JwtHelper} from '../../system/domain-service/jwt/jwt-helper';


export class TokenService {
    public static parseUserToken(tokenString: string): UserToken {
        try {
            const token = JwtHelper.decodeToken(tokenString);
            return new UserToken(
                tokenString,
                token['user_id'],
                token['exp'],
                token['iss']
            );
        } catch {
            return null;
        }
    }
}
