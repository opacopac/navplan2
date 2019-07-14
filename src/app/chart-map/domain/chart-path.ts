import {Clonable} from '../../system/domain/clonable';
import {Line} from '../../geo-math/domain/geometry/line';
import {LineJunction} from '../../geo-math/domain/geometry/lineJunction';
import {Position2d} from '../../geo-math/domain/geometry/position2d';


export class ChartPath implements Clonable<ChartPath> {
    public lines: Line[];
    public junctions: LineJunction[];


    constructor() {
        this.lines = [];
        this.junctions = [];
    }


    public addLine(line: Line): void {
        this.lines.push(line);

        if (this.lines.length > 1 && this.lines.length % 2 === 0) {
            const lineN = this.lines[this.lines.length - 1];
            const lineN_1 = this.lines[this.lines.length - 2];
            const junct = new LineJunction(lineN_1, lineN);

            this.junctions.push(junct);
            console.log(junct);
        }
    }


    public getPathPoints(): Position2d[] {
        const posList: Position2d[] = [];

        for (let i = 0; i < this.lines.length; i++) {
            if (i % 2 === 1) {
                this.junctions[i - 1].junctionArc.forEach(pos => posList.push(pos));
            }

            posList.push(this.lines[i].pos1);
            posList.push(this.lines[i].pos2);
        }

        return posList;
    }


    public clone(): ChartPath {
        const newChartPath = new ChartPath();
        this.lines.forEach((line) => newChartPath.lines.push(line.clone()));

        return newChartPath;
    }
}
