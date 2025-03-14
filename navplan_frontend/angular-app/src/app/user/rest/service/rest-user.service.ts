import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {User} from '../../domain/model/user';
import {Observable, of, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {TextError} from '../../../system/domain/model/text-error';
import {IRestTokenResponse} from '../model/i-rest-token-response';
import {IRestSimpleResponse} from '../model/i-rest-simple-response';
import {IUserRepoService} from '../../domain/service/i-user-repo.service';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';


@Injectable()
export class RestUserRepoService implements IUserRepoService {
    public constructor(private http: HttpClient) {
    }


    public autoLogin(): Observable<User> {
        const url = environment.userServiceUrl + '/autologin';

        return this.http
            .get<IRestTokenResponse>(
                url,
                HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS
            ).pipe(
                switchMap((response) => {
                    switch (response.resultcode) {
                        case 0:
                            return of(new User(response.email, response.token));
                        case -1:
                            throw new TextError('Invalid token!');
                        default:
                            throw new TextError('Unknown error while performing auto-login');
                    }
                }),
                catchError(err => {
                    LoggingService.logResponseError('ERROR during auto-login', err);
                    return throwError(err);
                }),
            );
    }


    public login(
        email: string,
        password: string,
        rememberMe: boolean
    ): Observable<User> {
        const url = environment.userServiceUrl + '/login';
        const requestBody = {
            email: email,
            password: password,
            rememberme: rememberMe ? '1' : '0'
        };

        return this.http
            .post<IRestTokenResponse>(
                url,
                JSON.stringify(requestBody)
            ).pipe(
                switchMap((response) => {
                    switch (response.resultcode) {
                        case 0:
                            return of(new User(response.email, response.token));
                        case -1:
                            throw new TextError('Email not found!');
                        case -2:
                            throw new TextError('Password incorrect!');
                        default:
                            throw new TextError('Unknown error during login');
                    }
                }),
                catchError(err => {
                    LoggingService.logResponseError('ERROR during login', err);
                    return throwError(err);
                }),
            );
    }


    public sendRegisterEmail(email: string): Observable<string> {
        const url = environment.userServiceUrl + '/sendregisteremail';
        const requestBody = {
            email: email
        };

        return this.http
            .post<IRestTokenResponse>(
                url,
                JSON.stringify(requestBody)
            ).pipe(
                switchMap(response => {
                    switch (response.resultcode) {
                        case 0:
                            return of(response.email);
                        case -1:
                            throw new TextError('Invalid email format!');
                        case -2:
                            throw new TextError('An account with this email already exists!');
                        default:
                            throw new TextError('Unexpected error while sending registration email');
                    }
                }),
                catchError(err => {
                    LoggingService.logResponseError('ERROR while sending registration email', err);
                    return throwError(err);
                }),
            );
    }


    public register(
        token: string,
        password: string,
        rememberMe: boolean
    ): Observable<User> {
        const url = environment.userServiceUrl + '/register';
        const requestBody = {
            token: token,
            password: password,
            rememberme: rememberMe ? '1' : '0',
        };

        return this.http
            .post<IRestTokenResponse>(
                url,
                JSON.stringify(requestBody)
            ).pipe(
                switchMap(response => {
                    switch (response.resultcode) {
                        case 0:
                            return of(new User(response.email, response.token));
                        case -1:
                            throw new TextError('Invalid password format!');
                        case -2:
                            throw new TextError('Invalid token!');
                        case -3:
                            throw new TextError('An account with this email already exists!');
                        default:
                            throw new TextError('Unknown error while registering');
                    }
                }),
                catchError(err => {
                    LoggingService.logResponseError('ERROR during registration', err);
                    return throwError(err);
                }),
            );
    }


    public sendLostPwEmail(email: string): Observable<string> {
        const url = environment.userServiceUrl + '/sendlostpwemail';
        const requestBody = {
            email: email
        };

        return this.http
            .post<IRestTokenResponse>(
                url,
                JSON.stringify(requestBody),
                HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS
            ).pipe(
                switchMap(response => {
                    switch (response.resultcode) {
                        case 0:
                            return of(response.email);
                        case -1:
                            throw new TextError('Invalid email format!');
                        case -2:
                            throw new TextError('An account with this email already exists!');
                        default:
                            throw new TextError('Unexpected error while sending password recovery email');
                    }
                }),
                catchError(err => {
                    LoggingService.logResponseError('ERROR while sending password recovery email', err);
                    return throwError(err);
                }),
            );
    }


    public resetPassword(
        newPassword: string,
        rememberMe: boolean
    ): Observable<User> {
        const url = environment.userServiceUrl + '/resetpassword';
        const requestBody = {
            password: newPassword,
            rememberme: rememberMe ? '1' : '0'
        };

        return this.http
            .post<IRestTokenResponse>(
                url,
                JSON.stringify(requestBody),
                HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS
            ).pipe(
                switchMap(response => {
                    switch (response.resultcode) {
                        case 0:
                            return of(new User(response.email, response.token));
                        case -1:
                            throw new TextError('Invalid password format!');
                        case -2:
                            throw new TextError('Invalid token!');
                        case -3:
                            throw new TextError('Email does not exists!');
                        default:
                            throw new TextError('Unknown error while resetting password');
                    }
                }),
                catchError(err => {
                    LoggingService.logResponseError('ERROR during password reset', err);
                    return throwError(err);
                }),
            );
    }


    public updatePassword(
        oldPassword: string,
        newPassword: string
    ): Observable<boolean> {
        const url = environment.userServiceUrl + '/updatepassword';
        const requestBody = {
            oldpassword: oldPassword,
            newpassword: newPassword
        };

        return this.http
            .post<IRestSimpleResponse>(
                url,
                JSON.stringify(requestBody),
                HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS
            ).pipe(
                switchMap(response => {
                    switch (response.resultcode) {
                        case 0:
                            return of(true);
                        case -1:
                            throw new TextError('Invalid new password format!');
                        case -2:
                            throw new TextError('Invalid token!');
                        case -3:
                            throw new TextError('Old password incorrect!');
                        default:
                            throw new TextError('Unknown error while updating password');
                    }
                }),
                catchError(err => {
                    LoggingService.logResponseError('ERROR during password update', err);
                    return throwError(err);
                }),
            );
    }
}
