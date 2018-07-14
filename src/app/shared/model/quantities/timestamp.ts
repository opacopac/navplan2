import {Clonable} from '../clonable';

export class Timestamp implements Clonable<Timestamp> {
    public epochSec: number;


    constructor(epochSec: number) {
        this.epochSec = epochSec;
    }


    public getMs(): number {
        return this.epochSec * 1000;
    }


    public clone(): Timestamp {
        return new Timestamp(this.epochSec);
    }
}
