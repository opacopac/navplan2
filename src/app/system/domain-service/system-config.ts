import {Injectable} from '@angular/core';
import {IDate} from './date/i-date';
import {JsDate} from './date/js-date';


@Injectable({
    providedIn: 'root'
})
export class SystemConfig {
    private date: IDate;


    constructor() {
        this.date = new JsDate();
    }


    public getDate(): IDate {
        return this.date;
    }
}
