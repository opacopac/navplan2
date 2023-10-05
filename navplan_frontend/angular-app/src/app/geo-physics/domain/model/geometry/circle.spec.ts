import {Circle} from './circle';
import {Position2d} from './position2d';
import {Geometry2dType} from './geometry2d';
import {Length} from '../quantities/length';
import {LengthUnit} from '../quantities/length-unit';

describe('Circle', () => {
    let center1: Position2d;
    let radius1: Length;

    beforeEach(() => {
        center1 = new Position2d(7.0, 47.0);
        radius1 = new Length(100, LengthUnit.M);
    });


    it('can create an instance', () => {
        const circle = new Circle(center1, radius1);
        expect(circle).toBeDefined();
        expect(circle.getGeometryType()).toEqual(Geometry2dType.CIRCLE);
        expect(circle.radius).toEqual(radius1);
        expect(circle.center).toEqual(center1);
    });
});
