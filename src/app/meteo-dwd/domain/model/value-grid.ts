import {GridDefinition} from './grid-definition';


export class ValueGrid<T> {
    constructor(
        public grid: GridDefinition,
        public values: T[]
    ) {
    }


    public getValueByXy(x: number, y: number): T {
        if (x < 0 || y < 0 || x >= this.grid.width || y >= this.grid.height) {
            return null;
        }

        const idx = x + y * this.grid.width;

        return this.values[idx];
    }
}
