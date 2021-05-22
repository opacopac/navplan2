import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {DataItem, DataItemType} from '../../common/model/data-item';
import {Length} from '../../common/geo-math/domain-model/quantities/length';
import {NavaidType} from './navaid-type';


export class Navaid extends DataItem {
    constructor(
        public id: number,
        public type: NavaidType,
        public kuerzel: string,
        public name: string,
        public position: Position2d,
        public elevation: Length,
        public frequency: string,
        public unit: string,
        public declination: number,
        public truenorth: boolean) {

        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.navaid;
    }


    public getPosition(): Position2d {
        return this.position;
    }


    public getTypeString(): string {
        switch (this.type) {
            case NavaidType.NDB: return 'NDB';
            case NavaidType.VOR_DME: return 'VOR-DME';
            case NavaidType.DVOR_DME: return 'DVOR-DME';
            case NavaidType.VOR: return 'VOR';
            case NavaidType.DVOR: return 'DVOR';
            case NavaidType.DME: return 'DME';
            case NavaidType.TACAN: return 'TACAN';
            case NavaidType.VORTAC: return 'VORTAC';
            case NavaidType.DVORTAC: return 'DVORTAC';
        }
    }
}
