import {Extent3d} from './extent3d';
import {Length} from '../quantities/length';
import {LengthUnit} from '../quantities/units';


describe('Extent3d', () => {
    const minLon = 7.0;
    const minLat = 47.0;
    const minHeight = new Length(0, LengthUnit.FT);
    const maxLon = 8.0;
    const maxLat = 48.0;
    const maxHeight = new Length(15000, LengthUnit.FT);


    beforeEach(() => {
    });


    it('creates an instance from lat, lon, height', () => {
        const extent = new Extent3d(minLon, minLat, minHeight, maxLon, maxLat, maxHeight);
        expect(extent).toBeDefined();
        expect(extent.minLon).toEqual(minLon);
        expect(extent.minLat).toEqual(minLat);
        expect(extent.minHeight).toEqual(minHeight);
        expect(extent.maxLon).toEqual(maxLon);
        expect(extent.maxLat).toEqual(maxLat);
        expect(extent.maxHeight).toEqual(maxHeight);
    });


    it('creates a clone', () => {
        const extent = new Extent3d(minLon, minLat, minHeight, maxLon, maxLat, maxHeight);
        const clone = extent.clone();

        expect(clone.minLon).toBe(minLon);
        expect(clone.minLat).toBe(minLat);
        expect(clone.minHeight).toEqual(minHeight);
        expect(clone.maxLon).toBe(maxLon);
        expect(clone.maxLat).toBe(maxLat);
        expect(clone.maxHeight).toEqual(maxHeight);
    });
});
