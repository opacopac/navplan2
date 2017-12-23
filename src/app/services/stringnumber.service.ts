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
}
