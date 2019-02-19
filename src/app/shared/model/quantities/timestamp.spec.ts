import {Timestamp} from './timestamp';

describe('Extent2d', () => {
    const epochSec1 = 1549218773;
    const epochMs2 = 1549195031085;


    beforeEach(() => {
    });


    it('creates an instance based on epoch seconds', () => {
        const ts = Timestamp.createFromSec(epochSec1);
        expect(ts.epochSec).toEqual(epochSec1);
        expect(ts.epochMs).toEqual(epochSec1 * 1000);
    });


    it('creates an instance based on epoch ms', () => {
        const ts = Timestamp.createFromMs(epochMs2);
        expect(ts.epochSec).toEqual(Math.round(epochMs2 / 1000));
        expect(ts.epochMs).toEqual(epochMs2);
    });


    it('creates an instance based on relative seconds', () => {
        const ms = Date.now();
        const ts = Timestamp.createFromRelSec(0);
        const tsP3 = Timestamp.createFromRelSec(3);
        const tsM5 = Timestamp.createFromRelSec(-5);
        expect(ts.epochMs).toEqual(ms);
        expect(tsP3.epochMs).toEqual(ms + 3000);
        expect(tsM5.epochMs).toEqual(ms - 5000);
    });
});
