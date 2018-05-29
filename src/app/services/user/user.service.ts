import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../utils/logging.service';
import { ClientstorageService } from '../utils/clientstorage.service';
import { SessionService } from '../utils/session.service';
import { User } from '../../model/user';


const userBaseUrl =  environment.restApiBaseUrl + 'php/users.php';


interface SimpleResponse {
    resultcode: number;
    message: string;
}

interface TokenResponse extends SimpleResponse {
    token: string;
}

const COOKIE_EMAIL = 'email';
const COOKIE_TOKEN = 'token';

@Injectable()
export class UserService {
    private session;


    public constructor(private http: HttpClient, private sessionService: SessionService ) {
        this.session = sessionService.getSessionContext();
    }


    public initUser(): User {
        const email = ClientstorageService.getCookie(COOKIE_EMAIL);
        const token = ClientstorageService.getCookie(COOKIE_TOKEN);

        if (email && token) {
            return this.persistInClient(email, token, true); // TODO: remember-flag correct
        } else {
            return null;
        }
    }


    public login(
        email: string,
        password: string,
        remember: boolean,
        successCallback: (user: User) => void,
        errorCallback: (message: string) => void) {

        let message: string;
        const requestBody = {
            action: 'login',
            email: email,
            password: password
        };
        this.http
            .post<TokenResponse>(userBaseUrl, JSON.stringify(requestBody), {observe: 'response'})
            .subscribe(
            response => {
                switch (response.body.resultcode) {
                    case 0:
                        const user = this.persistInClient(email, response.body.token, remember);
                        successCallback(user);
                        break;
                    case -1:
                        message = 'Wrong password!';
                        errorCallback(message);
                        break;
                    case -2:
                        message = 'Email not found!';
                        errorCallback(message);
                        break;
                    default:
                        message = 'ERROR performing login';
                        LoggingService.logResponseError(message, response);
                        errorCallback(message);
                }
            },
            err => {
                message = 'ERROR performing login!';
                LoggingService.logResponseError(message, err);
                errorCallback(message);
            }
        );
    }


    public logout() {
        this.session.user = null;

        // TODO: window.localStorage.removeItem("user");
        ClientstorageService.deleteCookie(COOKIE_EMAIL);
        ClientstorageService.deleteCookie(COOKIE_TOKEN);
    }


    public register(
        email: string,
        password: string,
        remember: boolean,
        successCallback: (user: User) => void,
        errorCallback: (message: string) => void) {

        let message: string;
        const requestBody = {
            action: 'register',
            email: email,
            password: password
        };
        this.http
            .post<TokenResponse>(userBaseUrl, JSON.stringify(requestBody), {observe: 'response'})
            .subscribe(
                response => {
                    switch (response.body.resultcode) {
                        case 0:
                            const user = this.persistInClient(email, response.body.token, remember);
                            successCallback(user);
                            break;
                        case -1:
                            message = 'Email already exists!';
                            errorCallback(message);
                            break;
                        default:
                            message = 'ERROR registering user';
                            LoggingService.logResponseError(message, response);
                            errorCallback(message);
                    }
                },
                err => {
                    message = 'ERROR registering user!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
                }
            );
    }


    public forgotPassword(
        email: string,
        successCallback: () => void,
        errorCallback: (message: string) => void) {

        let message: string;
        const requestBody = {
            action: 'forgotpassword',
            email: email
        };
        this.http
            .post<SimpleResponse>(userBaseUrl, JSON.stringify(requestBody), {observe: 'response'})
            .subscribe(
                response => {
                    switch (response.body.resultcode) {
                        case 0:
                            successCallback();
                            break;
                        case -2:
                            message = 'Email not found!';
                            errorCallback(message);
                            break;
                        default:
                            message = 'ERROR sending new pw';
                            LoggingService.logResponseError(message, response);
                            errorCallback(message);
                    }
                },
                err => {
                    message = 'ERROR sending new pw!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
                }
            );
    }


    public updatePassword(
        email: string,
        oldPassword: string,
        newPassword: string,
        successCallback: () => void,
        errorCallback: (message: string) => void) {

    let message: string;
    const requestBody = {
        action: 'updatepassword',
        email: email,
        oldpassword: oldPassword,
        newpassword: newPassword
    };
    this.http
        .post<SimpleResponse>(userBaseUrl, JSON.stringify(requestBody), {observe: 'response'})
        .subscribe(
            response => {
                switch (response.body.resultcode) {
                    case 0:
                        successCallback();
                        break;
                    case -1:
                        message = 'Wrong password!';
                        errorCallback(message);
                        break;
                    case -2:
                        message = 'Email not found!';
                        errorCallback(message);
                        break;
                    default:
                        message = 'ERROR updating pw';
                        LoggingService.logResponseError(message, response);
                        errorCallback(message);
                }
            },
            err => {
                message = 'ERROR updating pw!';
                LoggingService.logResponseError(message, err);
                errorCallback(message);
            }
        );
    }


    private persistInClient(email: string, token: string, remember: boolean): User {
        const user = new User(
            email,
            token
        );
        this.session.user = user;

        const rememberDays = remember ? 90 : 0;
        ClientstorageService.setCookie(COOKIE_EMAIL, user.email, rememberDays);
        ClientstorageService.setCookie(COOKIE_TOKEN, user.token, rememberDays);

        return user;
    }
}
