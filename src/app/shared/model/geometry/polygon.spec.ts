import {Position2d} from './position2d';
import {Geometry2dType} from './geometry2d';
import {Polygon} from './polygon';


describe('Polygon', () => {
    let posList: Position2d[];

    beforeEach(() => {
        posList = [
            new Position2d(7.0, 47.0),
            new Position2d(8.0, 48.0),
            new Position2d(7.5, 46.0)
        ];
    });


    it('can create an instance', () => {
        const poly = new Polygon(posList);
        expect(poly).toBeDefined();
        expect(poly.positions).toBeDefined();
        expect(poly.positions.length).toBe(posList.length);
        expect(poly.getGeometryType()).toBe(Geometry2dType.POLYGON);
    });


    it('creates an instance from a lon/lat array', () => {
        const poly = Polygon.createFromArray([[1.0, 10.0], [2.0, 20.0], [3.0, 30.0]]);
        expect(poly).toBeDefined();
        expect(poly.positions).toBeDefined();
        expect(poly.positions.length).toBe(3);
        expect(poly.positions[0]).toEqual(new Position2d(1.0, 10.0));
        expect(poly.positions[1]).toEqual(new Position2d(2.0, 20.0));
        expect(poly.positions[2]).toEqual(new Position2d(3.0, 30.0));
    });


    it('creates a lon/lat array from an instance', () => {
        const poly = new Polygon(posList);
        const lonLatList = poly.toArray();
        expect(lonLatList).toBeDefined();
        expect(lonLatList.length).toBe(posList.length);
        expect(lonLatList[0]).toEqual([posList[0].longitude, posList[0].latitude]);
        expect(lonLatList[1]).toEqual([posList[1].longitude, posList[1].latitude]);
        expect(lonLatList[2]).toEqual([posList[2].longitude, posList[2].latitude]);
    });


    it('calculates the average coordinate', () => {
        const poly = Polygon.createFromArray([[-2.0, 10.0], [5.0, 20.0], [3.0, -60.0]]);
        const avgPos = poly.getAveragePoint();
        expect(avgPos).toBeDefined();
        expect(avgPos.longitude).toBe(2);
        expect(avgPos.latitude).toBe(-10);
    });


    it('determines if a point is within the polygon', () => {
        const poly = new Polygon([
            new Position2d(-10, 40),
            new Position2d(10, 40),
            new Position2d(0, -10),
        ]);
        const posIn = new Position2d(1, 1);
        const posOut = new Position2d(-11, 40);

        expect(poly.containsPoint(posIn)).toBeTruthy();
        expect(poly.containsPoint(posOut)).toBeFalsy();
    });
});
