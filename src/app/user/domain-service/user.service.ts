import {Observable} from 'rxjs';
import {User} from '../domain-model/user';
import {IUserService} from './i-user.service';
import {IUserRepoService} from './i-user-repo.service';
import {Injectable} from '@angular/core';


@Injectable()
export class UserService implements IUserService {
    public constructor(private userRepo: IUserRepoService) {
    }


    public autoLogin(token: string): Observable<User> {
        return this.userRepo.autoLogin(token);
    }


    public login(email: string, password: string, rememberMe: boolean): Observable<User> {
        return this.userRepo.login(email, password, rememberMe);
    }


    public sendRegisterEmail(email: string): Observable<string> {
        return this.userRepo.sendRegisterEmail(email);
    }


    public register(token: string, password: string, rememberMe: boolean): Observable<User> {
        return this.userRepo.register(token, password, rememberMe);
    }


    public sendLostPwEmail(email: string): Observable<string> {
        return this.userRepo.sendLostPwEmail(email);
    }


    public resetPassword(token: string, newPassword: string, rememberMe: boolean): Observable<User> {
        return this.userRepo.resetPassword(token, newPassword, rememberMe);
    }


    public updatePassword(token: string, oldPassword: string, newPassword: string): Observable<boolean> {
        return this.userRepo.updatePassword(token, oldPassword, newPassword);
    }
}
