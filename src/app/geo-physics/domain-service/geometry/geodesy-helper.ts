import {Position2d} from '../../domain-model/geometry/position2d';
import {Angle} from '../../domain-model/quantities/angle';
import {Length} from '../../domain-model/quantities/length';
import {Vector3d} from '../../domain-model/geometry/vector3d';
import {LengthUnit} from '../../domain-model/quantities/length-unit';
import {AngleUnit} from '../../domain-model/quantities/angle-unit';
import {Extent2d} from '../../domain-model/geometry/extent2d';


// source #1: https://www.movable-type.co.uk/scripts/latlong.html
// source #2: https://vvvv.org/blog/polar-spherical-and-geographic-coordinates

export class GeodesyHelper {
    public static readonly EARTH_RADIUS_M = 6371000;


    public static calcDistance(pos1: Position2d, pos2: Position2d): Length {
        if (!pos1 || !pos2) {
            return undefined; // TODO
        }

        const phi1 = Angle.deg2rad(pos1.latitude);
        const phi2 = Angle.deg2rad(pos2.latitude);
        const dphi = Angle.deg2rad(pos2.latitude - pos1.latitude);
        const dlambda = Angle.deg2rad(pos2.longitude - pos1.longitude);

        const a = Math.sin(dphi / 2) * Math.sin(dphi / 2) + Math.cos(phi1)
            * Math.cos(phi2) * Math.sin(dlambda / 2) * Math.sin(dlambda / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = this.EARTH_RADIUS_M * c;

        return new Length(d, LengthUnit.M);
    }


    public static calcBearing(pos1: Position2d, pos2: Position2d, magvar: Angle = Angle.createZero()): Angle {
        if (!pos1 || !pos2 || !magvar) {
            return undefined; // TODO
        }

        const f1 = Angle.deg2rad(pos1.latitude);
        const f2 = Angle.deg2rad(pos2.latitude);
        const dl = Angle.deg2rad(pos2.longitude - pos1.longitude);
        const y = Math.sin(dl) * Math.cos(f2);
        const x = Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(dl);
        const t = Math.atan2(y, x);

        return new Angle((Angle.rad2deg(t) + 360) % 360 - magvar.getValue(AngleUnit.DEG), AngleUnit.DEG);
    }


    public static calcDestination(start: Position2d, bearing: Angle, distance: Length): Position2d {
        const phi1 = Angle.deg2rad(start.latitude);
        const lambda1 = Angle.deg2rad(start.longitude);
        const d_per_R = distance.m / GeodesyHelper.EARTH_RADIUS_M;
        const phi2 = Math.asin( Math.sin(phi1) * Math.cos(d_per_R) +
            Math.cos(phi1) * Math.sin(d_per_R) * Math.cos(bearing.rad));
        const lambda2 = lambda1 + Math.atan2(
            Math.sin(bearing.rad) * Math.sin(d_per_R) * Math.cos(phi1),
            Math.cos(d_per_R) - Math.sin(phi1) * Math.sin(phi2)
        );

        return new Position2d(
            Angle.rad2deg(lambda2),
            Angle.rad2deg(phi2)
        );
    }


    public static calcIntersection(posA1: Position2d, posA2: Position2d, posB1: Position2d, posB2: Position2d): Position2d {
        const gcA = GeodesyHelper.toUnitVector3d(posA1).cross(GeodesyHelper.toUnitVector3d(posA2));
        const gcB = GeodesyHelper.toUnitVector3d(posB1).cross(GeodesyHelper.toUnitVector3d(posB2));
        const gcIsect = gcA.cross(gcB);
        const isectVect1 = gcIsect.normalize();
        const isectVect2 = isectVect1.multiply(-1);
        const isectPos1 = GeodesyHelper.fromUnitVector3d(isectVect1);
        const isectPos2 = GeodesyHelper.fromUnitVector3d(isectVect2);
        const dist1 = GeodesyHelper.calcDistance(posA1, isectPos1);
        const dist2 = GeodesyHelper.calcDistance(posB1, isectPos2);

        return dist1.nm < dist2.nm ? isectPos1 : isectPos2;
    }


    public static calcBearingIntersection(posA: Position2d, bearA: Angle, posB: Position2d, bearB: Angle): Position2d {
        const posA2 = GeodesyHelper.calcDestination(posA, bearA, new Length(1, LengthUnit.NM));
        const posB2 = GeodesyHelper.calcDestination(posB, bearB, new Length(1, LengthUnit.NM));

        return GeodesyHelper.calcIntersection(posA, posA2, posB, posB2);
    }


    public static toUnitVector3d(pos: Position2d): Vector3d {
        const latRad = Angle.deg2rad(pos.latitude);
        const lonRad = Angle.deg2rad(pos.longitude);

        return new Vector3d(
            Math.cos(latRad) * Math.cos(lonRad),
            Math.cos(latRad) * Math.sin(lonRad),
            Math.sin(latRad)
        );
    }


    public static fromUnitVector3d(unitVector: Vector3d): Position2d {
        return new Position2d(
            Angle.rad2deg(Math.atan2(unitVector.y, unitVector.x)),
            Angle.rad2deg(Math.asin(unitVector.z))
        );
    }


    public static enlargeExtent(extent: Extent2d, length: Length): Extent2d {
        const maxPosN = this.calcDestination(extent.maxPos, new Angle(0, AngleUnit.DEG), length);
        const maxPosE = this.calcDestination(extent.maxPos, new Angle(90, AngleUnit.DEG), length);
        const minPosS = this.calcDestination(extent.minPos, new Angle(180, AngleUnit.DEG), length);
        const minPosW = this.calcDestination(extent.minPos, new Angle(270, AngleUnit.DEG), length);

        return new Extent2d(minPosW.longitude, minPosS.latitude, maxPosE.longitude, maxPosN.latitude);
    }
}
