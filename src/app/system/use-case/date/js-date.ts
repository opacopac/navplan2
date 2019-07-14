import {IDate} from './i-date';


export class JsDate implements IDate {
    nowMs(): number {
        return Date.now();
    }


    nowDate(): Date {
        return new Date();
    }


    create(year: number, month: number, day?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): Date {
        return new Date(year, month, day, hours, minutes, seconds, milliseconds);
    }
}
