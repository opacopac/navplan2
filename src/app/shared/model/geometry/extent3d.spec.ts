import {Extent3d} from './extent3d';
import {Position3d} from './position3d';
import {Altitude} from './altitude';
import {AltitudeUnit} from './altitude-unit';
import {AltitudeReference} from './altitude-reference';


describe('Extent3d', () => {
    const minLon = 7.0;
    const minLat = 47.0;
    const minAlt = new Altitude(0, AltitudeUnit.FT, AltitudeReference.MSL);
    const maxLon = 8.0;
    const maxLat = 48.0;
    const maxAlt = new Altitude(15000, AltitudeUnit.FT, AltitudeReference.MSL);
    let extent: Extent3d;


    beforeEach(() => {
        extent = new Extent3d(minLon, minLat, minAlt, maxLon, maxLat, maxAlt);
    });


    it('creates an instance from lat, lon, alt', () => {
        expect(extent).toBeDefined();
        expect(extent.minLon).toEqual(minLon);
        expect(extent.minLat).toEqual(minLat);
        expect(extent.minAlt).toEqual(minAlt);
        expect(extent.maxLon).toEqual(maxLon);
        expect(extent.maxLat).toEqual(maxLat);
        expect(extent.maxAlt).toEqual(maxAlt);
    });


    it('creates a clone', () => {
        const clone = extent.clone();

        expect(clone.minLon).toBe(minLon);
        expect(clone.minLat).toBe(minLat);
        expect(clone.minAlt).toEqual(minAlt);
        expect(clone.maxLon).toBe(maxLon);
        expect(clone.maxLat).toBe(maxLat);
        expect(clone.maxAlt).toEqual(maxAlt);
    });


    it('correctly determines a contained point', () => {
        const pointIn = new Position3d(7.5, 47.5, new Altitude(5000, AltitudeUnit.FT, AltitudeReference.MSL));
        const pointOut = new Position3d(7.5, 47.5, new Altitude(25000, AltitudeUnit.FT, AltitudeReference.MSL));
        const pointOut2 = new Position3d(1.5, 47.5, new Altitude(5000, AltitudeUnit.FT, AltitudeReference.MSL));

        expect(extent.containsPoint3d(pointIn)).toBeTruthy();
        expect(extent.containsPoint3d(pointOut)).toBeFalsy();
        expect(extent.containsPoint3d(pointOut2)).toBeFalsy();
    });
});
