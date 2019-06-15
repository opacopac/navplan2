import {DataItem, DataItemType} from '../../shared/model/data-item';
import {Position2d} from '../../shared/model/geometry/position2d';


export class Webcam extends DataItem {
    constructor(
        public id: number,
        public name: string,
        public url: string,
        public position?: Position2d) {

        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.webcam;
    }
}
