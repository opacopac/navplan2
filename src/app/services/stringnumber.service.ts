import { Injectable } from '@angular/core';

@Injectable()
export class StringnumberService {
    public static zeroPad(number: number, digits: number = 2): string {
        let text = number.toString();
        while (text.length < digits) {
            text = '0' + text;
        }

        return text;
    }


    public static roundToDigits(num: number, digits: number): number {
        return Math.round(num * Math.pow(10, digits)) / Math.pow(10, digits);
    }



    public static getHourColonMinString(minutes: number): string {
        if (!minutes) {
            minutes = 0;
        }

        const h = Math.floor(minutes / 60);
        const m = minutes - h * 60;

        return this.zeroPad(h, 2) + ':' + this.zeroPad(m, 2);
    }
}
