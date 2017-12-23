export class Timestamp {
    public epochSec: number;


    constructor(epochSec: number) {
        this.epochSec = epochSec;
    }


    public getMs(): number {
        return this.epochSec * 1000;
    }
}
