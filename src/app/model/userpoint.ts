import { Position2d } from './position';


export class Userpoint {
    constructor(
        public id: number,
        public type: string,
        public name: string,
        public position: Position2d,
        public remark: string,
        public supp_info: string) {
    }
}
