import {IDate} from './i-date';


export class MockDate implements IDate {
    public nowMsResult: number;
    public nowDateResult: Date;
    public createResult: Date;
    public createArgs: { year: number, month: number, day: number, hours: number, minutes: number, seconds: number, milliseconds: number };


    nowMs(): number {
        return this.nowMsResult;
    }


    nowDate(): Date {
        return this.nowDateResult;
    }


    create(year: number, month: number, day?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): Date {
        this.createArgs = {
            year: year,
            month: month,
            day: day,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            milliseconds: milliseconds
        };

        return this.createResult;
    }


    getDayEndTimestamp(deltaDaysFromToday: number): number {
        return 0; // TODO
    }


    getDayStartTimestamp(deltaDaysFromToday: number): number {
        return 0; // TODO
    }
}
