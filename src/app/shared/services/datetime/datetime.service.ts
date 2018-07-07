import { StringnumberService } from '../stringnumber/stringnumber.service';


export class DatetimeService {
    public static getMinSecStringFromDate(date: Date) {
        return StringnumberService.zeroPad(date.getMinutes()) + ':'
            + StringnumberService.zeroPad(date.getSeconds());
    }


    public static getMinSecStringFromMs(timeMs: number): string {
        return StringnumberService.zeroPad(Math.floor(timeMs / 60000)) + ':' + StringnumberService.zeroPad(Math.floor(timeMs / 1000) % 60);
    }


    public static getHourMinSecStringFromDate(date: Date): string {
        return StringnumberService.zeroPad(date.getHours())
            + ':' + StringnumberService.zeroPad(date.getMinutes())
            + ':' + StringnumberService.zeroPad(date.getSeconds());
    }


    public static getHourMinStringFromDate(date: Date): string {
        return StringnumberService.zeroPad(date.getHours())
            + ':' + StringnumberService.zeroPad(date.getMinutes());
    }


    public static getHourMinStringFromMinutes(minutes: number): string {
        if (!minutes) {
            minutes = 0;
        }

        const h = Math.floor(minutes / 60);
        const m = Math.round(minutes - h * 60);

        return StringnumberService.zeroPad(h, 2) + ':' + StringnumberService.zeroPad(m, 2);
    }


    public static getYearMonthDayString(date: Date): string {
        return date.getFullYear()
            + '-' + StringnumberService.zeroPad(date.getMonth() + 1)
            + '-' + StringnumberService.zeroPad(date.getDate());
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


    public static getDecimalYear(): number {
        const d1 = new Date();
        const d2 = new Date(d1.getFullYear(), 0, 0, 0, 0, 0, 0);
        const d3 = new Date(d1.getFullYear() + 1, 0, 0, 0, 0, 0, 0);
        const dec = (d1.getTime() - d2.getTime()) / (d3.getTime() - d2.getTime());

        return d1.getFullYear() + dec;
    }
}
