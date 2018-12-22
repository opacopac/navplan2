import {Clonable} from '../clonable';

export class Timestamp implements Clonable<Timestamp> {
    public epochSec: number;


    constructor(epochSec: number) {
        this.epochSec = epochSec;
    }


    public static now(): Timestamp {
        return this.createFromMs(Date.now());
    }


    public static createFromMs(epochMs: number): Timestamp {
        const epochSec = Math.round(epochMs / 1000);
        return new Timestamp(epochSec);
    }


    public getMs(): number {
        return this.epochSec * 1000;
    }


    public clone(): Timestamp {
        return new Timestamp(this.epochSec);
    }
}
