import {Observable} from 'rxjs';
import {User} from '../model/user';


export abstract class IUserService {
    abstract autoLogin(token: string): Observable<User>;

    abstract login(email: string, password: string, rememberMe: boolean): Observable<User>;

    abstract sendRegisterEmail(email: string): Observable<string>;

    abstract register(token: string, password: string, rememberMe: boolean): Observable<User>;

    abstract sendLostPwEmail(email: string): Observable<string>;

    abstract resetPassword(token: string, newPassword: string, rememberMe: boolean): Observable<User>;

    abstract updatePassword(token: string, oldPassword: string, newPassword: string): Observable<boolean>;
}
