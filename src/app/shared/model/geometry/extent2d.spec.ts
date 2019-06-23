import {Extent2d} from './extent2d';
import {Position2d} from './position2d';
import {GeocalcService} from '../../services/geocalc/geocalc.service';


describe('Extent2d', () => {
    const minLon1 = 7.0;
    const minLat1 = 47.0;
    const maxLon1 = 8.0;
    const maxLat1 = 48.0;
    const minLon2 = 7.1;
    const minLat2 = 47.1;
    const maxLon2 = 7.9;
    const maxLat2 = 47.9;


    beforeEach(() => {
    });


    it('has the correct lon/lat properties defined', () => {
        const extent = new Extent2d(minLon1, minLat1, maxLon1, maxLat1);
        expect(extent.minLon).toBe(minLon1);
        expect(extent.minLat).toBe(minLat1);
        expect(extent.maxLon).toBe(maxLon1);
        expect(extent.maxLat).toBe(maxLat1);
    });


    it('gets the correct lon/lat pos array', () => {
        const extent = new Extent2d(minLon1, minLat1, maxLon1, maxLat1);
        expect(extent.getAsLatLon()).toEqual([minLon1, minLat1, maxLon1, maxLat1]);
    });


    it('gets the correct mercator pos array', () => {
        const extent = Extent2d.createFromMercator([1, 2, 3, 4]);
        const extOut = extent.getAsMercator();
        expect(extOut[0]).toBeCloseTo(1, 8);
        expect(extOut[1]).toBeCloseTo(2, 8);
        expect(extOut[2]).toBeCloseTo(3, 8);
        expect(extOut[3]).toBeCloseTo(4, 8);
    });


    it('gets the correct min position', () => {
        const extent = new Extent2d(minLon1, minLat1, maxLon1, maxLat1);
        const minPosExpected = new Position2d(minLon1, minLat1);
        expect(extent.minPos).toEqual(minPosExpected);
    });


    it('gets the correct max position', () => {
        const extent = new Extent2d(minLon1, minLat1, maxLon1, maxLat1);
        const maxPosExpected = new Position2d(maxLon1, maxLat1);
        expect(extent.maxPos).toEqual(maxPosExpected);
    });


    it('calculates the correct mid position', () => {
        const extent = new Extent2d(minLon1, minLat1, maxLon1, maxLat1);
        const midPosExpected = new Position2d(
            (minLon1 + maxLon1) / 2,
            (minLat1 + maxLat1) / 2);
        expect(extent.getMidPos()).toEqual(midPosExpected);
    });


    it('calculates the correct radius from mid to corner', () => {
        const extent = new Extent2d(minLon1, minLat1, maxLon1, maxLat1);
        const midPos = new Position2d(
            (minLon1 + maxLon1) / 2,
            (minLat1 + maxLat1) / 2);
        const minPos = new Position2d(minLon1, minLat1);
        const radExpected = GeocalcService.calcDistance(minPos, midPos);
        expect(extent.getRadius().nm).toEqual(radExpected.nm);
    });


    it('correctly determines a contained point', () => {
        const extent1 = new Extent2d(minLon1, minLat1, maxLon1, maxLat1);
        const pointIn = extent1.getMidPos();
        const pointOut = new Position2d(minLon1 - 1, minLat1);
        expect(extent1.containsPoint2d(pointIn)).toBe(true);
        expect(extent1.containsPoint2d(pointOut)).toBe(false);
    });


    it('correctly determines a contained extent', () => {
        const extent1 = new Extent2d(minLon1, minLat1, maxLon1, maxLat1);
        const extent2 = new Extent2d(minLon2, minLat2, maxLon2, maxLat2);
        expect(extent1.containsExtent2d(extent2)).toBe(true);
        expect(extent2.containsExtent2d(extent1)).toBe(false);
        expect(extent1.containsExtent2d(extent1)).toBe(true);
    });


    it('correctly calculates an oversize extent', () => {
        const extent = new Extent2d(-1, -1, 1, 1);
        const expOversize = new Extent2d(-1.2, -1.2, 1.2, 1.2);
        expect(extent.getOversizeExtent(1)).toEqual(extent);
        expect(extent.getOversizeExtent(1.2)).toEqual(expOversize);
    });


    it('creates a clone', () => {
        const extent = new Extent2d(minLon1, minLat1, maxLon1, maxLat1);
        const clone = extent.clone();

        expect(clone.minLon).toBe(minLon1);
        expect(clone.minLat).toBe(minLat1);
        expect(clone.maxLon).toBe(maxLon1);
        expect(clone.maxLat).toBe(maxLat1);
    });
});
