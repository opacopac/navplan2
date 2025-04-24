import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {DataItem, DataItemType} from '../../../common/domain/model/data-item';
import {NavaidType} from './navaid-type';
import {Frequency} from '../../../geo-physics/domain/model/quantities/frequency';
import {Altitude} from '../../../geo-physics/domain/model/geometry/altitude';


export class Navaid extends DataItem {
    constructor(
        public id: number,
        public type: NavaidType,
        public kuerzel: string,
        public name: string,
        public position: Position2d,
        public elevation: Altitude,
        public frequency: Frequency,
        public declination: number,
        public truenorth: boolean
    ) {
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
