import {Observable} from 'rxjs';
import {User} from '../model/user';


export abstract class IUserService {
    abstract autoLogin(): Observable<User>;

    abstract login(email: string, password: string, rememberMe: boolean): Observable<User>;

    abstract sendRegisterEmail(email: string): Observable<string>;

    abstract register(password: string, rememberMe: boolean): Observable<User>;

    abstract sendLostPwEmail(email: string): Observable<string>;

    abstract resetPassword(newPassword: string, rememberMe: boolean): Observable<User>;

    abstract updatePassword(oldPassword: string, newPassword: string): Observable<boolean>;
}
