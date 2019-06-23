import {IDate} from './i-date';


export class JsDate implements IDate {
    now(): number {
        return Date.now();
    }
}
