import {Clonable} from '../clonable';


export class Timestamp implements Clonable<Timestamp> {
    private readonly _epochMs: number;


    public get epochSec(): number {
        return this.getSec();
    }


    public get epochMs(): number {
        return this._epochMs;
    }


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


    public clone(): Timestamp {
        return new Timestamp(this.epochSec);
    }


    private getSec(): number {
        return Math.round(this._epochMs / 1000);
    }
}
