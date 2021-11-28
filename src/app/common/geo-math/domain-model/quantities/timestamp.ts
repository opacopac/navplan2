import {Clonable} from '../../../../system/domain-model/clonable';


export class Timestamp implements Clonable<Timestamp> {
    private readonly _epochMs: number;


    private constructor(epochMs: number) {
        this._epochMs = epochMs;
    }


    public static now(): Timestamp {
        return this.createFromMs(Date.now());
    }


    public static createFromSec(epochSec: number): Timestamp {
        return new Timestamp(epochSec * 1000);
    }


    public static createFromMs(epochMs: number): Timestamp {
        return new Timestamp(epochMs);
    }


    public static createFromRelSec(relSec: number): Timestamp {
        return new Timestamp(Date.now() + relSec * 1000);
    }


    public get epochSec(): number {
        return Math.round(this._epochMs / 1000);
    }


    public get epochMs(): number {
        return this._epochMs;
    }


    public get date(): Date {
        return new Date(this.epochMs);
    }


    public clone(): Timestamp {
        return new Timestamp(this.epochMs);
    }
}
