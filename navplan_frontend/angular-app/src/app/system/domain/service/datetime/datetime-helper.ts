import {StringnumberHelper} from '../stringnumber/stringnumber-helper';


export class DatetimeHelper {
    public static getCurrentTimestampSeconds(): number {
        return Math.floor(Date.now() / 1000);
    }


    public static isTimestampSecondsExpired(timestampSeconds: number): boolean {
        return (timestampSeconds < this.getCurrentTimestampSeconds());
    }


    public static getMinSecStringFromDate(date: Date): string {
        return StringnumberHelper.zeroPad(date.getMinutes()) + ':'
            + StringnumberHelper.zeroPad(date.getSeconds());
    }


    public static getMinSecStringFromMs(timeMs: number): string {
        return StringnumberHelper.zeroPad(Math.floor(timeMs / 60000)) + ':' + StringnumberHelper.zeroPad(Math.floor(timeMs / 1000) % 60);
    }


    public static getHourMinSecStringFromDate(date: Date): string {
        return StringnumberHelper.zeroPad(date.getHours())
            + ':' + StringnumberHelper.zeroPad(date.getMinutes())
            + ':' + StringnumberHelper.zeroPad(date.getSeconds());
    }


    public static getHourMinStringFromDate(date: Date): string {
        return StringnumberHelper.zeroPad(date.getHours())
            + ':' + StringnumberHelper.zeroPad(date.getMinutes());
    }


    public static getHourMinStringFromMinutes(minutes: number): string {
        if (!minutes) {
            minutes = 0;
        }

        const h = Math.floor(minutes / 60);
        const m = Math.round(minutes - h * 60);

        return StringnumberHelper.zeroPad(h, 2) + ':' + StringnumberHelper.zeroPad(m, 2);
    }


    public static getYearMonthDayString(date: Date): string {
        return date.getFullYear()
            + '-' + StringnumberHelper.zeroPad(date.getMonth() + 1)
            + '-' + StringnumberHelper.zeroPad(date.getDate());
    }


    public static getHourMinAgeStringFromMs(timeMs: number): string {
        const ms = Date.now() - timeMs;
        const h = Math.floor(ms / 1000 / 3600);
        const m = Math.floor(ms / 1000 / 60 - h * 60);

        if (h > 0) {
            return h + 'h ' + m + 'min';
        } else {
            return m + 'min';
        }
    }


    public static getIsoTimeString(timeMs: number): string {
        const date = new Date(timeMs);
        return date.toISOString();
    }


    public static calcDecimalYear(date = new Date()): number {
        const d2 = new Date(date.getFullYear(), 0, 0, 0, 0, 0, 0);
        const d3 = new Date(date.getFullYear() + 1, 0, 0, 0, 0, 0, 0);
        const dec = (date.getTime() - d2.getTime()) / (d3.getTime() - d2.getTime());

        return date.getFullYear() + dec;
    }


    public static getWeekdayShortFromDate(date = new Date()): string {
        return date.toLocaleString('en', { weekday: 'short' });
    }
}
