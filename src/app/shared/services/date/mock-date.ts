import {IDate} from './i-date';


export class MockDate implements IDate {
    public nowResultMs: number;


    now(): number {
        return this.nowResultMs;
    }
}
