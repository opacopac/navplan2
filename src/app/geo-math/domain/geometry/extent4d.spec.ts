import {Timestamp} from '../quantities/timestamp';
import {Extent4d} from './extent4d';
import {Altitude} from './altitude';
import {AltitudeUnit} from './altitude-unit';
import {AltitudeReference} from './altitude-reference';


describe('Extent4d', () => {
    const minLon = 7.0;
    const minLat = 47.0;
    const minHeight = new Altitude(0, AltitudeUnit.FT, AltitudeReference.MSL);
    const minTimestamp = Timestamp.createFromRelSec(-120);
    const maxLon = 8.0;
    const maxLat = 48.0;
    const maxHeight = new Altitude(15000, AltitudeUnit.FT, AltitudeReference.MSL);
    const maxTimestamp = Timestamp.now();
    const extent = new Extent4d(minLon, minLat, minHeight, minTimestamp, maxLon, maxLat, maxHeight, maxTimestamp);


    beforeEach(() => {
    });


    it('creates an instance from lat, lon, height, timestamp', () => {
        expect(extent).toBeDefined();
        expect(extent.minLon).toEqual(minLon);
        expect(extent.minLat).toEqual(minLat);
        expect(extent.minAlt).toEqual(minHeight);
        expect(extent.minTimestamp).toEqual(minTimestamp);
        expect(extent.maxLon).toEqual(maxLon);
        expect(extent.maxLat).toEqual(maxLat);
        expect(extent.maxAlt).toEqual(maxHeight);
        expect(extent.maxTimestamp).toEqual(maxTimestamp);
    });


    it('creates a clone', () => {
        const clone = extent.clone();

        expect(clone.minLon).toBe(minLon);
        expect(clone.minLat).toBe(minLat);
        expect(clone.minAlt).toEqual(minHeight);
        expect(clone.minTimestamp).toEqual(minTimestamp);
        expect(clone.maxLon).toBe(maxLon);
        expect(clone.maxLat).toBe(maxLat);
        expect(clone.maxAlt).toEqual(maxHeight);
        expect(clone.maxTimestamp).toEqual(maxTimestamp);
    });
});
