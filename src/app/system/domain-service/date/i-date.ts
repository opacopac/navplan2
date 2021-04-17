export interface IDate {
    nowMs(): number;

    nowDate(): Date;

    create(year: number, month: number, day?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): Date;
}
