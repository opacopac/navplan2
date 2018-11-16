import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../shared/services/logging/logging.service';
import {User} from '../../model/user';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {of} from 'rxjs/internal/observable/of';


const userBaseUrl =  environment.restApiBaseUrl + 'php/user/api.php';


interface SimpleResponse {
    resultcode: number;
    message: string;
}

interface TokenResponse extends SimpleResponse {
    email: string;
    token: string;
}


@Injectable()
export class UserService {
    public constructor(
        private http: HttpClient) {
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
                        case 0:
                            return of(new User(email, response.body.token));
                        case -1:
                            return throwError('Wrong password!');
                        case -2:
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
                        case 0:
                            return of(new User(response.body.email, response.body.token));
                        case -3:
                            return throwError('invalid token!');
                        default:
                            const message = 'ERROR performing autologin';
                            LoggingService.logResponseError(message, response);
                            return throwError(message);
                    }
                })
            );
    }


    public register(
        email: string,
        password: string): Observable<User> {

        const requestBody = {
            action: 'register',
            email: email,
            password: password
        };
        return this.http
            .post<TokenResponse>(userBaseUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                switchMap(response => {
                    switch (response.body.resultcode) {
                        case 0:
                            return of(new User(email, response.body.token));
                        case -1:
                            return throwError('Email already exists!');
                        default:
                            const message = 'ERROR registering user';
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
                        case -2:
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
                    case -1:
                        return throwError('Wrong password!');
                    case -2:
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
