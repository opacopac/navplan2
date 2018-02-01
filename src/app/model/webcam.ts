import { Position2d } from './position';


export class Webcam {
    constructor(
        public id: number,
        public name: string,
        public url: string,
        public position: Position2d) {
    }
}
