import {Line} from './line';
import {Angle} from '../quantities/angle';
import {Position2d} from './position2d';
import {GeodesyHelper} from '../../domain-service/geometry/geodesy-helper';
import {Length} from '../quantities/length';
import {Clonable} from '../../../system/domain-model/clonable';
import {AngleUnit} from '../quantities/angle-unit';


export class LineJunction implements Clonable<LineJunction> {
    public circleStart: Position2d;
    public circleEnd: Position2d;
    public bearingStart: Angle;
    public bearingEnd: Angle;
    public turnAngle: Angle;
    public center: Position2d;
    public radius: Length;
    public junctionArc: Position2d[];


    public constructor(
        public readonly line1: Line,
        public readonly line2: Line
    ) {
        this.calcJunctionCircle();
        this.calcJunctionArc();
    }


    public clone(): LineJunction {
        return new LineJunction(this.line1, this.line2);
    }


    private calcJunctionCircle() {
        this.bearingStart = GeodesyHelper.calcBearing(this.line1.pos1, this.line1.pos2);
        this.bearingEnd = GeodesyHelper.calcBearing(this.line2.pos1, this.line2.pos2);

        // intersection between legs
        const isect = GeodesyHelper.calcIntersection(this.line1.pos1, this.line1.pos2, this.line2.pos1, this.line2.pos2);
        const bearL1ToIsect = GeodesyHelper.calcBearing(this.line1.pos2, isect);
        const bearIsectToL2 = GeodesyHelper.calcBearing(isect, this.line2.pos1);
        const distL1Isect = GeodesyHelper.calcDistance(this.line1.pos2, isect);
        const distL2Isect = GeodesyHelper.calcDistance(this.line2.pos1, isect);

        // handle the 4 different cases
        if (this.sameAngel(this.bearingStart, bearL1ToIsect) && this.sameAngel(this.bearingEnd, bearIsectToL2)) {
            // normal inside turn, no leg crosses intersection
            this.turnAngle = this.getTurnAngle(false);
            if (distL1Isect.m < distL2Isect.m) {
                this.circleStart = this.line1.pos2;
                this.circleEnd = GeodesyHelper.calcDestination(this.line2.pos1, this.bearingEnd.flip(), distL2Isect.subtract(distL1Isect));
            } else {
                this.circleStart = GeodesyHelper.calcDestination(this.line1.pos2, this.bearingStart, distL1Isect.subtract(distL2Isect));
                this.circleEnd = this.line2.pos1;
            }
        } else if (!this.sameAngel(this.bearingStart, bearL1ToIsect) && this.sameAngel(this.bearingEnd, bearIsectToL2)) {
            // outside loop, inbound leg crosses intersection
            this.turnAngle = this.getTurnAngle(true);
            this.circleStart = this.line1.pos2;
            this.circleEnd = GeodesyHelper.calcDestination(this.line2.pos1, this.bearingEnd.flip(), distL1Isect.add(distL2Isect));
        } else if (this.sameAngel(this.bearingStart, bearL1ToIsect) && !this.sameAngel(this.bearingEnd, bearIsectToL2)) {
            // outside loop, outbound leg crosses intersection
            this.turnAngle = this.getTurnAngle(true);
            this.circleStart = GeodesyHelper.calcDestination(this.line1.pos2, this.bearingStart, distL1Isect.add(distL2Isect));
            this.circleEnd = this.line2.pos1;
        } else {
            // outside loop, both legs cross intersection
            this.turnAngle = this.getTurnAngle(true);
            if (distL1Isect.m > distL2Isect.m) {
                this.circleStart = this.line1.pos2;
                this.circleEnd = GeodesyHelper.calcDestination(this.line2.pos1, this.bearingEnd.flip(), distL1Isect.subtract(distL2Isect));
            } else {
                this.circleStart = GeodesyHelper.calcDestination(this.line1.pos2, this.bearingStart, distL2Isect.subtract(distL1Isect));
                this.circleEnd = this.line2.pos1;
            }
        }

        // calc circle
        this.center = GeodesyHelper.calcBearingIntersection(
            this.circleStart,
            new Angle(this.bearingStart.deg + 90, AngleUnit.DEG),
            this.circleEnd,
            new Angle(this.bearingEnd.deg + 90, AngleUnit.DEG)
        );
        this.radius = GeodesyHelper.calcDistance(this.circleStart, this.center);
    }


    private calcJunctionArc() {
        this.junctionArc = [];

        const radiusBearIn = GeodesyHelper.calcBearing(this.center, this.circleStart);
        for (let i = 0; i < 1; i += 0.1) {
            const radiusBear = new Angle(radiusBearIn.deg + i * this.turnAngle.deg, AngleUnit.DEG);
            const arcPos = GeodesyHelper.calcDestination(this.center, radiusBear, this.radius);
            this.junctionArc.push(arcPos);
        }
    }


    // TODO => angle
    private sameAngel(angle1: Angle, angle2: Angle, toleranceDeg: number = 5): boolean {
        return Math.abs((angle1.deg % 360) - (angle2.deg % 360)) <= toleranceDeg;
    }


    private getTurnAngle(isOutsideLoop: boolean): Angle {
        if (isOutsideLoop) {
            return Angle.calcBigDiffAngle(this.bearingStart, this.bearingEnd);
        } else {
            return Angle.calcSmallDiffAngle(this.bearingStart, this.bearingEnd);
        }
    }
}
