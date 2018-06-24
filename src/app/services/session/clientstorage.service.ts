import {Injectable} from '@angular/core';
import {User} from '../../model/session/user';

const COOKIE_EMAIL = 'email';
const COOKIE_TOKEN = 'token';


@Injectable()
export class ClientstorageService {
    constructor() { }


    // region user

    public getPersistedUser(): User {
        const email = this.getCookie(COOKIE_EMAIL);
        const token = this.getCookie(COOKIE_TOKEN);

        if (email && token) {
            return new User(email, token);
        } else {
            return undefined;
        }
    }


    public persistUser(user: User, remember: boolean) {
        if (user) {
            const rememberDays = remember ? 90 : 0;
            this.setCookie(COOKIE_EMAIL, user.email, rememberDays);
            this.setCookie(COOKIE_TOKEN, user.token, rememberDays);
        }
    }


    public deletePersistedUser() {
        this.deleteCookie(COOKIE_EMAIL);
        this.deleteCookie(COOKIE_TOKEN);
    }

    // endregion


    // region cookies

    private setCookie(cname: string, cvalue: string, exdays: number): void {
        if (exdays > 0) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            const expires = 'expires=' + d.toUTCString();
            document.cookie = cname + '=' + cvalue + '; ' + expires;
        } else {
            document.cookie = cname + '=' + cvalue;
        }
    }


    private getCookie(cname: string): string {
        const name = cname + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }


    private deleteCookie(cname: string): void {
        document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    }

    // endregion
}
