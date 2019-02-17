import {Length} from './quantities/length';
import {LengthUnit} from './units';
import {Timestamp} from './quantities/timestamp';
import {Extent4d} from './extent4d';


describe('Extent4d', () => {
    const minLon = 7.0;
    const minLat = 47.0;
    const minHeight = new Length(0, LengthUnit.FT);
    const minTimestamp = Timestamp.now();
    const maxLon = 8.0;
    const maxLat = 48.0;
    const maxHeight = new Length(15000, LengthUnit.FT);
    const maxTimestamp = Timestamp.createFromSec(minTimestamp.epochSec + 48 * 60 * 60);


    beforeEach(() => {
    });


    it('creates an instance from lat, lon, height, timestamp', () => {
        const extent = new Extent4d(minLon, minLat, minHeight, minTimestamp, maxLon, maxLat, maxHeight, maxTimestamp);
        expect(extent).toBeDefined();
        expect(extent.minLon).toEqual(minLon);
        expect(extent.minLat).toEqual(minLat);
        expect(extent.minHeight).toEqual(minHeight);
        expect(extent.minTimestamp).toEqual(minTimestamp);
        expect(extent.maxLon).toEqual(maxLon);
        expect(extent.maxLat).toEqual(maxLat);
        expect(extent.maxHeight).toEqual(maxHeight);
        expect(extent.maxTimestamp).toEqual(maxTimestamp);
    });


    it('creates a clone', () => {
        const extent = new Extent4d(minLon, minLat, minHeight, minTimestamp, maxLon, maxLat, maxHeight, maxTimestamp);
        const clone = extent.clone();

        expect(clone.minLon).toBe(minLon);
        expect(clone.minLat).toBe(minLat);
        expect(clone.minHeight).toEqual(minHeight);
        expect(clone.minTimestamp).toEqual(minTimestamp);
        expect(clone.maxLon).toBe(maxLon);
        expect(clone.maxLat).toBe(maxLat);
        expect(clone.maxHeight).toEqual(maxHeight);
        expect(clone.maxTimestamp).toEqual(maxTimestamp);
    });
});
