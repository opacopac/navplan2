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
import {TextError} from '../../../shared/model/text-error';


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
                        case -1:
                            return throwError(new TextError('Invalid token!'));
                        default:
                            const message = 'Unknown error while performing auto-login';
                            LoggingService.logResponseError(message, response);
                            return throwError(new TextError(message));
                    }
                })
            );
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
                            return of(new User(response.body.email, response.body.token));
                        case -1:
                            return throwError(new TextError('Password incorrect!'));
                        case -2:
                            return throwError(new TextError('Email not found!'));
                        default:
                            const message = 'Unknown error during login';
                            LoggingService.logResponseError(message, response);
                            return throwError(new TextError(message));
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
                        case 0:
                            return of(response.body.email);
                        case -1:
                            return throwError(new TextError('Invalid email format!'));
                        case -2:
                            return throwError(new TextError('An account with this email already exists!'));
                        default:
                            const message = 'Unexpected error while verifying email';
                            LoggingService.logResponseError(message, response);
                            return throwError(new TextError(message));
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
                    switch (response.body.resultcode) {
                        case 0:
                            return of(new User(response.body.email, response.body.token));
                        case -1:
                            return throwError(new TextError('Invalid password format!'));
                        case -2:
                            return throwError(new TextError('Invalid email format!'));
                        case -3:
                            return throwError(new TextError('An account with this email already exists!'));
                        case -4:
                            return throwError(new TextError('Invalid token!'));
                        default:
                            const message = 'Unknown error while activating user';
                            LoggingService.logResponseError(message, response);
                            return throwError(new TextError(message));
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
                            return throwError(new TextError('Email not found!'));
                        default:
                            const message = 'Unknown error while sending new password';
                            LoggingService.logResponseError(message, response);
                            return throwError(new TextError(message));
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
                        return throwError(new TextError('Password incorrect!'));
                    case 92:
                        return throwError(new TextError('Email not found!'));
                    default:
                        const message = 'Unknown error while updating password';
                        LoggingService.logResponseError(message, response);
                        return throwError(new TextError(message));
                }
            })
        );
    }
}
