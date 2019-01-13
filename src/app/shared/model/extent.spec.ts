import {Extent} from "./extent";
import {Position2d} from "./geometry/position2d";
import {GeocalcService} from "../services/geocalc/geocalc.service";


describe('Extent', () => {
    let lonLatPosArray1: [number, number, number, number] = [7.0, 47.0, 8.0, 48.0];
    let lonLatPosArray2: [number, number, number, number] = [7.1, 47.1, 7.9, 47.9];


    beforeEach(() => {
    });


    it('has the correct indexer defined', () => {
        const extent = Extent.createFromLatLon(lonLatPosArray1);
        expect(extent[0]).toBe(lonLatPosArray1[0]);
        expect(extent[1]).toBe(lonLatPosArray1[1]);
        expect(extent[2]).toBe(lonLatPosArray1[2]);
        expect(extent[3]).toBe(lonLatPosArray1[3]);
    });


    it('has the correct lon/lat properties defined', () => {
        const extent = Extent.createFromLatLon(lonLatPosArray1);
        expect(extent.minLon).toBe(lonLatPosArray1[0]);
        expect(extent.minLat).toBe(lonLatPosArray1[1]);
        expect(extent.maxLon).toBe(lonLatPosArray1[2]);
        expect(extent.maxLat).toBe(lonLatPosArray1[3]);
    });


    it('gets the correct lon/lat pos array', () => {
        const extent = Extent.createFromLatLon(lonLatPosArray1);
        expect(extent.getAsLatLon()).toEqual(lonLatPosArray1);
    });


    it('gets the correct mercator pos array', () => {
        const extent = Extent.createFromMercator([1, 2, 3, 4]);
        const extOut = extent.getAsMercator();
        expect(extOut[0]).toBeCloseTo(1, 8);
        expect(extOut[1]).toBeCloseTo(2, 8);
        expect(extOut[2]).toBeCloseTo(3, 8);
        expect(extOut[3]).toBeCloseTo(4, 8);
    });


    it('gets the correct min position', () => {
        const extent = Extent.createFromLatLon(lonLatPosArray1);
        const minPosExpected = new Position2d(lonLatPosArray1[0], lonLatPosArray1[1]);
        expect(extent.minPos).toEqual(minPosExpected);
    });


    it('gets the correct max position', () => {
        const extent = Extent.createFromLatLon(lonLatPosArray1);
        const maxPosExpected = new Position2d(lonLatPosArray1[2], lonLatPosArray1[3]);
        expect(extent.maxPos).toEqual(maxPosExpected);
    });


    it('calculates the correct mid position', () => {
        const extent = Extent.createFromLatLon(lonLatPosArray1);
        const midPosExpected = new Position2d(
            (lonLatPosArray1[0] + lonLatPosArray1[2]) / 2,
            (lonLatPosArray1[1] + lonLatPosArray1[3]) / 2);
        expect(extent.getMidPos()).toEqual(midPosExpected);
    });


    it('calculates the correct radius from mid to corner', () => {
        const extent = Extent.createFromLatLon(lonLatPosArray1);
        const midPos = new Position2d(
            (lonLatPosArray1[0] + lonLatPosArray1[2]) / 2,
            (lonLatPosArray1[1] + lonLatPosArray1[3]) / 2);
        const minPos = new Position2d(lonLatPosArray1[0], lonLatPosArray1[1]);
        const radExpected = GeocalcService.getDistance(minPos, midPos);
        expect(extent.getRadius().nm).toEqual(radExpected.nm);
    });


    it('correctly determines a contained extent', () => {
        const extent1 = Extent.createFromLatLon(lonLatPosArray1);
        const extent2 = Extent.createFromLatLon(lonLatPosArray2);
        expect(extent1.containsExtent(extent2)).toBe(true);
        expect(extent2.containsExtent(extent1)).toBe(false);
        expect(extent1.containsExtent(extent1)).toBe(true);
    });


    it('correctly calculates an oversize extent', () => {
        const extent = Extent.createFromLatLon([-1, -1, 1, 1]);
        const expOversize = Extent.createFromLatLon([-1.2, -1.2, 1.2, 1.2]);
        expect(extent.getOversizeExtent(1)).toEqual(extent);
        expect(extent.getOversizeExtent(1.2)).toEqual(expOversize);
    });
});
