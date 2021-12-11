import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {User} from '../../user/domain-model/user';
import {Observable, of, throwError} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {TextError} from '../../system/domain-model/text-error';
import {IRestTokenResponse} from '../rest-model/i-rest-token-response';
import {IRestSimpleResponse} from '../rest-model/i-rest-simple-response';
import {IUserRepoService} from '../../user/domain-service/i-user-repo.service';


@Injectable()
export class RestUserRepoService implements IUserRepoService {
    public constructor(private http: HttpClient) {
    }


    public autoLogin(token: string): Observable<User> {
        const requestBody = {
            action: 'autologin',
            token: token
        };
        return this.http
            .post<IRestTokenResponse>(environment.userServiceUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
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
            .post<IRestTokenResponse>(environment.userServiceUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                switchMap((response) => {
                    switch (response.body.resultcode) {
                        case 0:
                            return of(new User(response.body.email, response.body.token));
                        case -1:
                            return throwError(new TextError('Email not found!'));
                        case -2:
                            return throwError(new TextError('Password incorrect!'));
                        default:
                            const message = 'Unknown error during login';
                            LoggingService.logResponseError(message, response);
                            return throwError(new TextError(message));
                    }
                })
            );
    }


    public sendRegisterEmail(email: string): Observable<string> {
        const requestBody = {
            action: 'sendregisteremail',
            email: email
        };
        return this.http
            .post<IRestTokenResponse>(environment.userServiceUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                switchMap(response => {
                    switch (response.body.resultcode) {
                        case 0:
                            return of(response.body.email);
                        case -1:
                            return throwError(new TextError('Invalid email format!'));
                        case -2:
                            return throwError(new TextError('An account with this email already exists!'));
                        default:
                            const message = 'Unexpected error while sending registration email';
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
            .post<IRestTokenResponse>(environment.userServiceUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                switchMap(response => {
                    switch (response.body.resultcode) {
                        case 0:
                            return of(new User(response.body.email, response.body.token));
                        case -1:
                            return throwError(new TextError('Invalid password format!'));
                        case -2:
                            return throwError(new TextError('Invalid token!'));
                        case -3:
                            return throwError(new TextError('An account with this email already exists!'));
                        default:
                            const message = 'Unknown error while activating user';
                            LoggingService.logResponseError(message, response);
                            return throwError(new TextError(message));
                    }
                })
            );
    }


    public sendLostPwEmail(email: string): Observable<string> {
        const requestBody = {
            action: 'sendlostpwemail',
            email: email
        };
        return this.http
            .post<IRestTokenResponse>(environment.userServiceUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                switchMap(response => {
                    switch (response.body.resultcode) {
                        case 0:
                            return of(response.body.email);
                        case -1:
                            return throwError(new TextError('Invalid email format!'));
                        case -2:
                            return throwError(new TextError('An account with this email already exists!'));
                        default:
                            const message = 'Unexpected error while sending pw recovery email';
                            LoggingService.logResponseError(message, response);
                            return throwError(new TextError(message));
                    }
                })
            );
    }


    public resetPassword(
        token: string,
        newPassword: string,
        rememberMe: boolean): Observable<User> {

        const requestBody = {
            action: 'resetpassword',
            token: token,
            password: newPassword,
            rememberme: rememberMe
        };
        return this.http
            .post<IRestTokenResponse>(environment.userServiceUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
                switchMap(response => {
                    switch (response.body.resultcode) {
                        case 0:
                            return of(new User(response.body.email, response.body.token));
                        case -1:
                            return throwError(new TextError('Invalid password format!'));
                        case -2:
                            return throwError(new TextError('Invalid token!'));
                        case -3:
                            return throwError(new TextError('Email does not exists!'));
                        default:
                            const message = 'Unknown error while resetting password';
                            LoggingService.logResponseError(message, response);
                            return throwError(new TextError(message));
                    }
                })
            );
    }


    public updatePassword(
        token: string,
        oldPassword: string,
        newPassword: string): Observable<boolean> {

    const requestBody = {
        action: 'updatepassword',
        token: token,
        oldpassword: oldPassword,
        newpassword: newPassword
    };
    return this.http
        .post<IRestSimpleResponse>(environment.userServiceUrl, JSON.stringify(requestBody), {observe: 'response'}).pipe(
            switchMap(response => {
                switch (response.body.resultcode) {
                    case 0:
                        return of(true);
                    case -1:
                        return throwError(new TextError('Invalid new password format!'));
                    case -2:
                        return throwError(new TextError('Invalid token!'));
                    case -3:
                        return throwError(new TextError('Old password incorrect!'));
                    default:
                        const message = 'Unknown error while updating password';
                        LoggingService.logResponseError(message, response);
                        return throwError(new TextError(message));
                }
            })
        );
    }
}
