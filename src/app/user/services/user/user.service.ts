import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../core/services/utils/logging.service';
import {User} from '../../model/user';
import {Observable} from 'rxjs/Observable';


const userBaseUrl =  environment.restApiBaseUrl + 'php/users.php';


interface SimpleResponse {
    resultcode: number;
    message: string;
}

interface TokenResponse extends SimpleResponse {
    token: string;
}


@Injectable()
export class UserService {
    public constructor(
        private http: HttpClient) {
    }


    public login(
        email: string,
        password: string): Observable<User> {

        const requestBody = {
            action: 'login',
            email: email,
            password: password
        };
        return this.http
            .post<TokenResponse>(userBaseUrl, JSON.stringify(requestBody), {observe: 'response'})
            .switchMap((response) => {
                switch (response.body.resultcode) {
                    case 0:
                        return Observable.of(new User(email, response.body.token));
                    case -1:
                        return Observable.throw('Wrong password!');
                    case -2:
                        return Observable.throw('Email not found!');
                    default:
                        const message = 'ERROR performing login';
                        LoggingService.logResponseError(message, response);
                        return Observable.throw(message);
                }
            });
    }


    public reLogin(
        email: string,
        token: string): Observable<User> {

        const requestBody = {
            action: 'relogin',
            email: email,
            token: token
        };
        return this.http
            .post<TokenResponse>(userBaseUrl, JSON.stringify(requestBody), {observe: 'response'})
            .switchMap((response) => {
                switch (response.body.resultcode) {
                    case 0:
                        return Observable.of(new User(email, response.body.token));
                    case -2:
                        return Observable.throw('Email or token not found!');
                    default:
                        const message = 'ERROR performing login';
                        LoggingService.logResponseError(message, response);
                        return Observable.throw(message);
                }
            });
    }


    public logout(
        email: string,
        token: string): Observable<void> {

        const requestBody = {
            action: 'logout',
            email: email,
            token: token
        };
        return this.http
            .post<SimpleResponse>(userBaseUrl, JSON.stringify(requestBody), {observe: 'response'})
            .switchMap((response) => {
                switch (response.body.resultcode) {
                    case 0:
                        return Observable.of(undefined);
                    case -2:
                        return Observable.throw('Email or token not found!');
                    default:
                        const message = 'ERROR performing logout';
                        LoggingService.logResponseError(message, response);
                        return Observable.throw(message);
                }
            });
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
            .post<TokenResponse>(userBaseUrl, JSON.stringify(requestBody), {observe: 'response'})
            .switchMap(response => {
                switch (response.body.resultcode) {
                    case 0:
                        return Observable.of(new User(email, response.body.token));
                    case -1:
                        return Observable.throw('Email already exists!');
                    default:
                        const message = 'ERROR registering user';
                        LoggingService.logResponseError(message, response);
                        return Observable.throw(message);
                }
            });
    }


    public forgotPassword(email: string): Observable<void> {
        const requestBody = {
            action: 'forgotpassword',
            email: email
        };
        return this.http
            .post<SimpleResponse>(userBaseUrl, JSON.stringify(requestBody), {observe: 'response'})
            .switchMap(response => {
                switch (response.body.resultcode) {
                    case 0:
                        return Observable.of();
                    case -2:
                        return Observable.throw('Email not found!');
                    default:
                        const message = 'ERROR sending new pw';
                        LoggingService.logResponseError(message, response);
                        return Observable.throw(message);
                }
            });
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
        .post<SimpleResponse>(userBaseUrl, JSON.stringify(requestBody), {observe: 'response'})
        .switchMap(response => {
            switch (response.body.resultcode) {
                case 0:
                    return Observable.of();
                case -1:
                    return Observable.throw('Wrong password!');
                case -2:
                    return Observable.throw('Email not found!');
                default:
                    const message = 'ERROR updating pw';
                    LoggingService.logResponseError(message, response);
                    return Observable.throw(message);
            }}
        );
    }
}
