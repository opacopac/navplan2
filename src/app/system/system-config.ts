import {Injectable} from '@angular/core';
import {IDate} from './use-case/date/i-date';
import {JsDate} from './use-case/date/js-date';


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
