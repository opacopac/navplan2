import {Extent3d} from './extent3d';
import {Length} from '../quantities/length';
import {LengthUnit} from '../quantities/units';
import {Position3d} from './position3d';


describe('Extent3d', () => {
    const minLon = 7.0;
    const minLat = 47.0;
    const minHeight = new Length(0, LengthUnit.FT);
    const maxLon = 8.0;
    const maxLat = 48.0;
    const maxHeight = new Length(15000, LengthUnit.FT);
    let extent: Extent3d;


    beforeEach(() => {
        extent = new Extent3d(minLon, minLat, minHeight, maxLon, maxLat, maxHeight);
    });


    it('creates an instance from lat, lon, height', () => {
        expect(extent).toBeDefined();
        expect(extent.minLon).toEqual(minLon);
        expect(extent.minLat).toEqual(minLat);
        expect(extent.minHeight).toEqual(minHeight);
        expect(extent.maxLon).toEqual(maxLon);
        expect(extent.maxLat).toEqual(maxLat);
        expect(extent.maxHeight).toEqual(maxHeight);
    });


    it('creates a clone', () => {
        const clone = extent.clone();

        expect(clone.minLon).toBe(minLon);
        expect(clone.minLat).toBe(minLat);
        expect(clone.minHeight).toEqual(minHeight);
        expect(clone.maxLon).toBe(maxLon);
        expect(clone.maxLat).toBe(maxLat);
        expect(clone.maxHeight).toEqual(maxHeight);
    });


    it('correctly determines a contained point', () => {
        const pointIn = new Position3d(7.5, 47.5, new Length(5000, LengthUnit.FT));
        const pointOut = new Position3d(7.5, 47.5, new Length(25000, LengthUnit.FT));
        const pointOut2 = new Position3d(1.5, 47.5, new Length(5000, LengthUnit.FT));

        expect(extent.containsPoint(pointIn)).toBeTruthy();
        expect(extent.containsPoint(pointOut)).toBeFalsy();
        expect(extent.containsPoint(pointOut2)).toBeFalsy();
    });
});
