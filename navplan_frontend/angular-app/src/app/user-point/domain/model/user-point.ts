import {DataItem, DataItemType} from '../../../common/domain/model/data-item';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';


export class UserPoint extends DataItem {
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


    public getPosition(): Position2d {
        return this.position;
    }
}
