import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../shared/services/logging/logging.service';
import {User} from '../../model/user';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {of} from 'rxjs/internal/observable/of';
import {JwtService} from '../../../shared/services/jwt/jwt.service';


const userBaseUrl =  environment.restApiBaseUrl + 'php/Navplan/User/UserService.php';


interface SimpleResponse {
    resultcode: number;
    message: string;
}

interface TokenResponse extends SimpleResponse {
    email: string;
    token: string;
}

interface UserToken {
    tokenString: string;
    email: string;
    expireTimestamp: number;
    issuer: string;
}


@Injectable()
export class UserService {
    public constructor(
        private http: HttpClient) {
    }


    public static parseUserToken(tokenString: string): UserToken {
        try {
            const token = JwtService.decodeToken(tokenString);
            return {
                'tokenString': tokenString,
                'email': token['user_id'],
                'expireTimestamp': token['exp'],
                'issuer': token['iss']
            };
        } catch {
            return null;
        }
    }


    public login(
        email: string,
        password: string,
        rememberMe: boolean): Observable<User> {

        const requestBody = {
            action: 'login',
            email: email,
            password: password,
            rememberme: rememberMe ? '1' : '0'
        };
        return this.http
            .post<TokenResponse>(userBaseUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                switchMap((response) => {
                    switch (response.body.resultcode) {
                        case 10:
                            return of(new User(response.body.email, response.body.token));
                        case 91:
                            return throwError('Wrong password!');
                        case 92:
                            return throwError('Email not found!');
                        default:
                            const message = 'ERROR performing login';
                            LoggingService.logResponseError(message, response);
                            return throwError(message);
                    }
                })
            );
    }


    public autoLogin(token: string): Observable<User> {
        const requestBody = {
            action: 'autologin',
            token: token
        };
        return this.http
            .post<TokenResponse>(userBaseUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                switchMap((response) => {
                    switch (response.body.resultcode) {
                        case 10:
                            return of(new User(response.body.email, response.body.token));
                        case 93:
                            return throwError('invalid token!');
                        default:
                            const message = 'ERROR performing autologin';
                            LoggingService.logResponseError(message, response);
                            return throwError(message);
                    }
                })
            );
    }


    public verifyEmail(email: string): Observable<string> {
        const requestBody = {
            action: 'verifyemail',
            email: email
        };
        return this.http
            .post<TokenResponse>(userBaseUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                switchMap(response => {
                    switch (response.body.resultcode) {
                        case 11:
                            return of(response.body.email);
                        case 94:
                            return throwError('invalid email format!');
                        case 96:
                            return throwError('email already exists!');
                        default:
                            const message = 'ERROR verifying email';
                            LoggingService.logResponseError(message, response);
                            return throwError(message);
                    }
                })
            );
    }


    public register(
        token: string,
        password: string,
        rememberMe: boolean): Observable<User> {

        const requestBody = {
            action: 'register',
            token: token,
            password: password,
            rememberme: rememberMe,
        };
        return this.http
            .post<TokenResponse>(userBaseUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                switchMap(response => {
                    // TODO
                    switch (response.body.resultcode) {
                        case 12:
                            return of(new User(response.body.email, response.body.token));
                        case 93:
                            return throwError('invalid token!');
                        case 95:
                            return throwError('invalid password format!');
                        default:
                            const message = 'ERROR activating user';
                            LoggingService.logResponseError(message, response);
                            return throwError(message);
                    }
                })
            );
    }


    public forgotPassword(email: string): Observable<void> {
        const requestBody = {
            action: 'forgotpassword',
            email: email
        };
        return this.http
            .post<SimpleResponse>(userBaseUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                switchMap(response => {
                    switch (response.body.resultcode) {
                        case 0:
                            return of(undefined);
                        case 95:
                            return throwError('Email not found!');
                        default:
                            const message = 'ERROR sending new pw';
                            LoggingService.logResponseError(message, response);
                            return throwError(message);
                    }
                })
            );
    }


    public updatePassword(
        email: string,
        oldPassword: string,
        newPassword: string): Observable<void> {

    const requestBody = {
        action: 'updatepassword',
        email: email,
        oldpassword: oldPassword,
        newpassword: newPassword
    };
    return this.http
        .post<SimpleResponse>(userBaseUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
            switchMap(response => {
                switch (response.body.resultcode) {
                    case 0:
                        return of(undefined);
                    case 91:
                        return throwError('Wrong password!');
                    case 92:
                        return throwError('Email not found!');
                    default:
                        const message = 'ERROR updating pw';
                        LoggingService.logResponseError(message, response);
                        return throwError(message);
                }
            })
        );
    }
}
