import {Observable} from 'rxjs';
import {User} from '../model/user';
import {IUserService} from './i-user.service';
import {IUserRepoService} from './i-user-repo.service';
import {Injectable} from '@angular/core';


@Injectable()
export class UserService implements IUserService {
    public constructor(private userRepo: IUserRepoService) {
    }


    public autoLogin(): Observable<User> {
        return this.userRepo.autoLogin();
    }


    public login(email: string, password: string, rememberMe: boolean): Observable<User> {
        return this.userRepo.login(email, password, rememberMe);
    }


    public sendRegisterEmail(email: string): Observable<string> {
        return this.userRepo.sendRegisterEmail(email);
    }


    public register(password: string, rememberMe: boolean): Observable<User> {
        return this.userRepo.register(password, rememberMe);
    }


    public sendLostPwEmail(email: string): Observable<string> {
        return this.userRepo.sendLostPwEmail(email);
    }


    public resetPassword(newPassword: string, rememberMe: boolean): Observable<User> {
        return this.userRepo.resetPassword(newPassword, rememberMe);
    }


    public updatePassword(oldPassword: string, newPassword: string): Observable<boolean> {
        return this.userRepo.updatePassword(oldPassword, newPassword);
    }
}
