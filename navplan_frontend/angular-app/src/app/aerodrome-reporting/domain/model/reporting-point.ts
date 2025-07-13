import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {DataItem, DataItemType} from '../../../common/domain/model/data-item';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {ReportingPointOrSector} from './reporting-point-or-sector';
import {ReportingType} from './reporting-type';


export class ReportingPoint extends DataItem implements ReportingPointOrSector {
    constructor(
        public id: number,
        public airport_icao: string,
        public name: string,
        public heli: boolean,
        public inbd_comp: boolean,
        public outbd_comp: boolean,
        public position: Position2d,
        public alt_min?: Length,
        public alt_max?: Length
    ) {
        super();
    }

    public get type(): ReportingType {
        return ReportingType.POINT;
    }


    public get airportIcao(): string {
        return this.airport_icao;
    }


    public get isHeli(): boolean {
        return this.heli;
    }


    public get inbdComp(): boolean {
        return this.inbd_comp;
    }


    public get outbdComp(): boolean {
        return this.outbd_comp;
    }


    public get altMin(): Length | undefined {
        return this.alt_min;
    }


    public get altMax(): Length | undefined {
        return this.alt_max;
    }


    public get dataItemType(): DataItemType {
        return DataItemType.reportingPoint;
    }


    public getPosition(): Position2d {
        return this.position;
    }
}
