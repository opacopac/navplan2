import { Injectable } from '@angular/core';

@Injectable()
export class ClientstorageService {
    constructor() { }


    public static setCookie(cname: string, cvalue: string, exdays: number): void {
        if (exdays > 0) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            const expires = 'expires=' + d.toUTCString();
            document.cookie = cname + '=' + cvalue + '; ' + expires;
        } else {
            document.cookie = cname + '=' + cvalue;
        }
    }


    public static getCookie(cname: string): string {
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


    public static deleteCookie(cname: string): void {
        document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    }

}
