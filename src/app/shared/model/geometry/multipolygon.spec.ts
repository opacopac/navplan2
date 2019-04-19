import {Position2d} from './position2d';
import {Geometry2dType} from './geometry2d';
import {Polygon} from './polygon';
import {Multipolygon} from './multipolygon';


describe('Multipolygon', () => {
    let poly1, poly2: Polygon;
    let posList1: Position2d[];
    let posList2: Position2d[];

    beforeEach(() => {
        posList1 = [
            new Position2d(7.0, 47.0),
            new Position2d(8.0, 48.0),
            new Position2d(7.5, 46.0)
        ];
        posList2 = [
            new Position2d(3.0, -47.0),
            new Position2d(2.0, 48.0),
            new Position2d(5.5, -10.3),
            new Position2d(5.5, 20.3)
        ];
        poly1 = new Polygon(posList1);
        poly2 = new Polygon(posList2);
    });


    it('can create an instance', () => {
        const multipoly = new Multipolygon([poly1, poly2]);
        expect(multipoly).toBeDefined();
        expect(multipoly.polygons).toBeDefined();
        expect(multipoly.polygons.length).toBe(2);
        expect(multipoly.getGeometryType()).toBe(Geometry2dType.MULTIPOLYGON);
    });


    it('creates an instance from a lon/lat array', () => {
        const multipoly = Multipolygon.createFromArray(
            [
                [[1.0, 10.0], [2.0, 20.0], [3.0, 30.0]],
                [[-31.0, 30.0], [3.0, 21.0], [1.0, 30.3], [12, 21]]
            ]
        );
        expect(multipoly).toBeDefined();
        expect(multipoly.polygons).toBeDefined();
        expect(multipoly.polygons.length).toBe(2);
        expect(multipoly.polygons[0].positions).toBeDefined();
        expect(multipoly.polygons[0].positions.length).toBe(3);
        expect(multipoly.polygons[1].positions).toBeDefined();
        expect(multipoly.polygons[1].positions.length).toBe(4);
    });


    it('creates a lon/lat array from an instance', () => {
        const multipoly = new Multipolygon([poly1, poly2]);
        const lonLatList = multipoly.toArray();
        expect(lonLatList).toBeDefined();
        expect(lonLatList.length).toBe(2);
        expect(lonLatList[0]).toBeDefined();
        expect(lonLatList[0].length).toBe(posList1.length);
        expect(lonLatList[1]).toBeDefined();
        expect(lonLatList[1].length).toBe(posList2.length);
    });
});
