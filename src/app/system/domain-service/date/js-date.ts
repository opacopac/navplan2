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


    getDayStartTimestamp(deltaDaysFromToday: number = 0): number {
        const now = this.nowDate();
        return Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate() + deltaDaysFromToday).getTime() / 1000);
    }


    getDayEndTimestamp(deltaDaysFromToday: number = 0): number {
        const now = this.nowDate();
        return Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate() + deltaDaysFromToday).getTime() / 1000);
    }
}
