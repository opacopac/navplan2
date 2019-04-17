import {Circle} from "./circle";
import {Position2d} from "./position2d";
import {Geometry2dType} from "./geometry2d";

describe('Circle', () => {
    let center1: Position2d;

    beforeEach(() => {
        center1 = new Position2d(7.0, 47.0);
    });


    it('can create an instance', () => {
        const circle = new Circle(center1, 100);
        expect(circle).toBeDefined();
        expect(circle.getGeometryType()).toEqual(Geometry2dType.CIRCLE);
        expect(circle.radius_m).toBe(100);
        expect(circle.center).toEqual(center1);
    });
});
