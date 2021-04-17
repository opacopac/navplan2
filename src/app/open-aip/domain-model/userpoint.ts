import {DataItem, DataItemType} from '../../shared/model/data-item';
import {Position2d} from '../../geo-math/domain-model/geometry/position2d';


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


    public get dataItemType(): DataItemType {
        return DataItemType.userPoint;
    }
}
