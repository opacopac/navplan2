import {GeodesyHelper} from './geodesy-helper';
import {Position2d} from '../domain-model/geometry/position2d';
import {AngleUnit, LengthUnit} from '../domain-model/quantities/units';
import {Vector3d} from '../domain-model/geometry/vector3d';
import {Angle} from '../domain-model/quantities/angle';
import {Length} from '../domain-model/quantities/length';


describe('GeodesyHelper', () => {
    beforeEach(() => {
    });


    it('calculates the correct distance between 2 positions', () => {
        const pos1 = new Position2d(7.0, 47.0);
        const pos2 = new Position2d(7.1, 47.1);

        const dist = GeodesyHelper.calcDistance(pos1, pos2);

        expect(dist.getValue(LengthUnit.M)).toBeCloseTo(13455.27849608188, 0);
    });


    it('calculates the correct bearing between 2 positions', () => {
        const pos1 = new Position2d(7.0, 47.0);
        const pos2 = new Position2d(7.1, 47.1);

        const bearing = GeodesyHelper.calcBearing(pos1, pos2);

        expect(bearing.deg).toBeCloseTo(34.23, 1);
    });


    it('calculates the destination for a start pos, bearing and distance #1', () => {
        const start = new Position2d(7.0, 47.0);
        const bear = new Angle(180, AngleUnit.DEG);
        const dist = new Length(60, LengthUnit.NM);

        const dest = GeodesyHelper.calcDestination(start, bear, dist);

        expect(dest.longitude).toBeCloseTo(7.0, 1);
        expect(dest.latitude).toBeCloseTo(46.0, 1);
    });


    it('calculates the destination for a start pos, bearing and distance #2', () => {
        const start = new Position2d(1.0, 0.0);
        const bear = new Angle(-90, AngleUnit.DEG);
        const dist = new Length(120, LengthUnit.NM);

        const dest = GeodesyHelper.calcDestination(start, bear, dist);

        expect(dest.longitude).toBeCloseTo(-1.0, 1);
        expect(dest.latitude).toBeCloseTo(0.0, 1);
    });


    it('calculates the intersection between 2 great circles #1', () => {
        const posA1 = new Position2d(7.0, 47.0);
        const posA2 = new Position2d(8.0, 48.0);
        const posB1 = new Position2d(8.0, 47.0);
        const posB2 = new Position2d(7.0, 48.0);

        const isect = GeodesyHelper.calcIntersection(posA1, posA2, posB1, posB2);

        expect(isect.longitude).toBeCloseTo(7.5, 1);
        expect(isect.latitude).toBeCloseTo(47.5, 1);
    });


    it('calculates the intersection between 2 great circles #2', () => {
        const posA1 = new Position2d(0, 10);
        const posA2 = new Position2d(0, 20);
        const posB1 = new Position2d(10, 0);
        const posB2 = new Position2d(20, 0);

        const isect = GeodesyHelper.calcIntersection(posA1, posA2, posB1, posB2);

        expect(isect.longitude).toBeCloseTo(0.0, 10);
        expect(isect.latitude).toBeCloseTo(0.0, 10);
    });


    it('converts lon/lat to a unit vector', () => {
        const pos1 = new Position2d(0.0, 0.0);
        const pos2 = new Position2d(0.0, 90.0);

        const vect1 = GeodesyHelper.toUnitVector3d(pos1);
        const vect2 = GeodesyHelper.toUnitVector3d(pos2);

        expect(vect1.length()).toBeCloseTo(1, 10);
        expect(vect1.x).toBeCloseTo(1, 10);
        expect(vect1.y).toBeCloseTo(0, 10);
        expect(vect1.z).toBeCloseTo(0, 10);
        expect(vect2.length()).toBeCloseTo(1, 10);
        expect(vect2.x).toBeCloseTo(0, 10);
        expect(vect2.y).toBeCloseTo(0, 10);
        expect(vect2.z).toBeCloseTo(1, 10);
    });


    it('converts a unit vector to lon/lat', () => {
        const vect1 = new Vector3d(1, 0, 0);
        const vect2 = new Vector3d(0, 0, 1);

        const pos1 = GeodesyHelper.fromUnitVector3d(vect1);
        const pos2 = GeodesyHelper.fromUnitVector3d(vect2);

        expect(pos1.longitude).toBeCloseTo(0, 10);
        expect(pos1.latitude).toBeCloseTo(0, 10);
        expect(pos2.longitude).toBeCloseTo(0, 10);
        expect(pos2.latitude).toBeCloseTo(90, 10);
    });
});
