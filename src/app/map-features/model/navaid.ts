import { Position2d } from '../../shared/model/geometry/position2d';
import {DataItem, DataItemType} from '../../shared/model/data-item';


export enum NavaidType {
    NDB,
    VOR_DME,
    DVOR_DME,
    VOR,
    DVOR,
    DME,
    TACAN,
    VORTAC,
    DVORTAC
}


export class Navaid extends DataItem {
    constructor(
        public id: number,
        public type: NavaidType,
        public kuerzel: string,
        public name: string,
        public position: Position2d,
        public elevation_m: number, // TODO: own class
        public frequency: string,
        public unit: string,
        public declination: number,
        public truenorth: boolean) {

        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.navaid;
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
