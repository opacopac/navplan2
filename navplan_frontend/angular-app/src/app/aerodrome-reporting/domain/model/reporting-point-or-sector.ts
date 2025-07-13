import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {ReportingType} from './reporting-type';


export interface ReportingPointOrSector {
    get type(): ReportingType;

    get id(): number;

    get airportIcao(): string;

    get name(): string;

    get isHeli(): boolean;

    get inbdComp(): boolean;

    get outbdComp(): boolean;

    get altMin(): Length | undefined;

    get altMax(): Length | undefined;
}
