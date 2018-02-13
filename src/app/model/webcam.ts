import { Position2d } from './position';
import { DataItem } from './data-item';


export class Webcam extends DataItem {
    constructor(
        public id: number,
        public name: string,
        public url: string,
        public position: Position2d) {

        super();
    }
}
