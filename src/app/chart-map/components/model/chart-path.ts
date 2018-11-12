import {Clonable} from '../../../shared/model/clonable';
import {Line} from '../../../shared/model/geometry/line';

export class ChartPath implements Clonable<ChartPath> {
    public lines: Line[];


    constructor() {
        this.lines = [];
    }


    public clone(): ChartPath {
        const newChartPath = new ChartPath();
        this.lines.forEach((line) => newChartPath.lines.push(line.clone()));

        return newChartPath;
    }
}
