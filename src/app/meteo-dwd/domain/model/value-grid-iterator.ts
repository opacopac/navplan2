import {ValueGrid} from './value-grid';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';


export class ValueGridIterator<T> {
    public value: T;
    public x = -1;
    public y = 0;
    public pos: Position2d;
    private idx = -1;


    public constructor(private valueGrid: ValueGrid<T>) {
    }


    public next(): boolean {
        if (this.idx + 1 >= this.valueGrid.values.length) {
            return false;
        }

        this.idx++;
        this.x++;
        if (this.x >= this.valueGrid.grid.width) {
            this.x = 0;
            this.y++;
        }

        this.value = this.valueGrid.getValueByXy(this.x, this.y);
        this.pos = new Position2d(
            this.valueGrid.grid.getLonByX(this.x),
            this.valueGrid.grid.getLatByY(this.y),
        );

        return true;
    }
}
