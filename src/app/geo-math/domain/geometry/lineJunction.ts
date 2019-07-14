import {Line} from './line';
import {AngleUnit} from '../quantities/units';
import {Angle} from '../quantities/angle';
import {Position2d} from './position2d';


export class LineJunction {
    public circlePosIn: Position2d;
    public circlePosOut: Position2d;
    public center: Position2d;
    public radius: number;
    public junctionArc: Position2d[];


    public constructor(
        public readonly line1: Line,
        public readonly line2: Line
    ) {
        this.calcJunctionCircle();
        this.calcJunctionArc();
    }


    private calcJunctionCircle() {
        const isect = this.line1.intersect(this.line2);
        const vectIn = isect.subtract(this.line1.pos2);
        const vectOut = this.line2.pos1.subtract(isect);
        const distFromIsect = vectIn.distFromOrig() < vectOut.distFromOrig() ? vectIn.distFromOrig() : vectOut.distFromOrig();
        this.circlePosIn = isect.subtract(vectIn.normalize().multiply(distFromIsect));
        this.circlePosOut = isect.add(vectOut.normalize().multiply(distFromIsect));
        const perpLineIn = new Line(this.circlePosIn, isect.rotate(this.circlePosIn, new Angle(90, AngleUnit.DEG)));
        const perpLineOut = new Line(this.circlePosOut, isect.rotate(this.circlePosOut, new Angle(90, AngleUnit.DEG)));
        this.center = perpLineIn.intersect(perpLineOut);
        this.radius = this.center.subtract(this.circlePosIn).distFromOrig();
    }


    private calcJunctionArc() {
        this.junctionArc = [];

        let minDistFromOut = -1;
        for (let i = 0; i < 360; i += 10) {
            const arcPos = this.circlePosIn.rotate(this.center, new Angle(i, AngleUnit.DEG));
            const distFromOut = this.circlePosOut.subtract(arcPos).distFromOrig();
            if (minDistFromOut === -1 || distFromOut < minDistFromOut) {
                minDistFromOut = distFromOut;
                this.junctionArc.push(arcPos);
            } else {
                break;
            }
        }
    }
}
