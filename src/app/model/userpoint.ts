import { Position2d } from './position';
import { DataItem } from './data-item';


export class Userpoint extends DataItem {
    constructor(
        public id: number,
        public type: string,
        public name: string,
        public position: Position2d,
        public remark: string,
        public supp_info: string) {

        super();
    }
}
