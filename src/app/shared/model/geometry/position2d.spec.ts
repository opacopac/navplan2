import {Position2d} from "./position2d";
import {Geometry2dType} from "./geometry2d";

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
});
