import {Position2d} from './position2d';
describe('Position2d', () => {

    beforeEach(() => {
    });


    it('can create an instance', () => {
        const pos = new Position2d(7.0, 47.0);
        expect(pos).toBeDefined();
        expect(pos.longitude).toEqual(7.0);
        expect(pos.latitude).toEqual(47.0);
        expect(pos.getGeometryType()).toEqual(Geometry2dType.POSITION);
    });


    it('creates an instance from a lon/lat array', () => {
        const pos = Position2d.createFromArray([1.0, 2.0]);
        expect(pos).toBeDefined();
        expect(pos.longitude).toEqual(1.0);
        expect(pos.latitude).toEqual(2.0);
    });


    it('can be cloned', () => {
        const pos1 = new Position2d(7.0, 47.0);
        const pos2 = pos1.clone();

        expect(pos2).toBeDefined();
        expect(pos2.longitude).toEqual(pos1.longitude);
        expect(pos2.latitude).toEqual(pos1.latitude);
    });


    it('compares equal instances', () => {
        const pos1 = new Position2d(7.0, 47.0);
        const pos2 = new Position2d(7.0, 47.0);
        const pos3 = new Position2d(8.0, 47.0);

        expect(pos1.equals(pos2)).toBeTruthy();
        expect(pos1.equals(pos3)).toBeFalsy();
    });


    it('compares equal instances with precision', () => {
        const pos1 = new Position2d(7.11, 47.21);
        const pos2 = new Position2d(7.12, 47.22);
        const pos3 = new Position2d(7.21, 47.21);

        expect(pos1.equals(pos2, 1)).toBeTruthy();
        expect(pos1.equals(pos2, 2)).toBeFalsy();
        expect(pos1.equals(pos3, 0)).toBeTruthy();
        expect(pos1.equals(pos3, 1)).toBeFalsy();
    });


    it('rounds the coordinates to a precision', () => {
        const pos1 = new Position2d(7.125, 47.271);
        const pos2 = pos1.clone();
        const pos3 = pos1.clone();
        pos1.round(0);
        pos2.round(1);
        pos3.round(2);

        expect(pos1).toEqual(new Position2d(7, 47));
        expect(pos2).toEqual(new Position2d(7.1, 47.3));
        expect(pos3).toEqual(new Position2d(7.13, 47.27));
    });


    it('creates a lon/lat array', () => {
        const pos = new Position2d(7.125, 47.271);
        const lonLat = pos.toArray();

        expect(lonLat).toBeDefined();
        expect(lonLat.length).toBe(2);
        expect(lonLat[0]).toEqual(pos.longitude);
        expect(lonLat[1]).toEqual(pos.latitude);
    });


    it('throws an error for undefined values', () => {
        expect(() => { const pos = new Position2d(7.0, undefined); }).toThrow();
        expect(() => { const pos = new Position2d(undefined, 47.0); }).toThrow();
        expect(() => { const pos = new Position2d(undefined, undefined); }).toThrow();
    });


    it('adds a point', () => {
        const pos1 = new Position2d(7.0, 47.0);
        const pos2 = new Position2d(0.9, 0.8);

        expect(pos1.add(pos2)).toEqual(new Position2d(7.9, 47.8));
        expect(pos1.add(pos2)).toEqual(pos2.add(pos1));
    });


    it('subtracts a point', () => {
        const pos1 = new Position2d(7.9, 47.8);
        const pos2 = new Position2d(0.9, 0.8);

        expect(pos1.subtract(pos2)).toEqual(new Position2d(7.0, 47.0));
    });


    it('multiplies a point with a factor', () => {
        const pos1 = new Position2d(1.0, -1.0);

        expect(pos1.multiply(2)).toEqual(new Position2d(2.0, -2.0));
    });


    it('calculates distance from the origin', () => {
        const pos1 = new Position2d(1.0, 0.0);
        const pos2 = new Position2d(1.0, 1.0);

        expect(pos1.distFromOrig()).toEqual(1);
        expect(pos2.distFromOrig()).toEqual(Math.sqrt(2));
    });


    it('normalizes the point', () => {
        const pos1 = new Position2d(1.0, 1.0);

        const normPos1 = pos1.normalize();

        expect(normPos1.longitude).toBeCloseTo(1 / Math.sqrt(2), 10);
        expect(normPos1.latitude).toBeCloseTo(1 / Math.sqrt(2), 10);
        expect(normPos1.distFromOrig()).toBeCloseTo(1, 10);
    });


    it('rotates a point', () => {
        const pos1 = new Position2d(7.0, 48.0);
        const center = new Position2d(7.0, 47.0);
        const angle = new Angle(90, AngleUnit.DEG);

        const rotPos = pos1.rotate(center, angle);

        expect(rotPos).toEqual(new Position2d(8.0, 47.0));
    });


    it('rotates a point #2', () => {
        const pos1 = new Position2d(1.0, 0.0);
        const center = new Position2d(0.0, 0.0);
        const angle = new Angle(-90, AngleUnit.DEG);

        const rotPos = pos1.rotate(center, angle);

        expect(rotPos.longitude).toBeCloseTo(0.0, 10);
        expect(rotPos.latitude).toBeCloseTo(1.0, 10);
    });

});


import {Geometry2dType} from './geometry2d';
import {Angle} from '../quantities/angle';
import {AngleUnit} from '../quantities/units';
