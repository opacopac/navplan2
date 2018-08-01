import {DataItem, DataItemType} from '../../shared/model/data-item';
import {TrafficPosition} from './traffic-position';
import {Clonable} from '../../shared/model/clonable';


const MAX_AGE_SEC_INACTIVE = 30;


// region ENUMS

export enum TrafficAircraftType {
    'HELICOPTER_ROTORCRAFT',
    'GLIDER',
    'PARACHUTE',
    'HANG_GLIDER',
    'PARA_GLIDER',
    'BALLOON',
    'AIRSHIP',
    'UNKNOWN',
    'STATIC_OBJECT',
    'DROP_PLANE',
    'UFO',
    'UAV',
    'JET_AIRCRAFT',
    'POWERED_AIRCRAFT',
    'TOW_PLANE',
}


export enum TrafficAddressType {
    RANDOM,
    ICAO,
    FLARM,
    OGN
}


export enum TrafficDataSource {
    OGN,
    ADSBX
}


// endregion


export class Traffic extends DataItem implements Clonable<Traffic> {
    constructor(
        public acaddress: string,
        public addresstype: TrafficAddressType,
        public dataSource: TrafficDataSource,
        public actype: TrafficAircraftType,
        public registration: string,
        public callsign: string,
        public opCallsign: string,
        public aircraftModelType: string,
        public positions: TrafficPosition[]) {

        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.traffic;
    }


    public clone(): Traffic {
        const newPositions: TrafficPosition[] = [];
        this.positions.forEach((pos) => newPositions.push(pos.clone()));

        return new Traffic(
            this.acaddress,
            this.addresstype,
            this.dataSource,
            this.actype,
            this.registration,
            this.callsign,
            this.opCallsign,
            this.aircraftModelType,
            newPositions
        );
    }


    public hasPositions(): boolean {
        return (this.positions && this.positions.length > 0);
    }


    public getCurrentPosition(): TrafficPosition {
        if (!this.hasPositions()) {
            return undefined;
        }

        return this.positions[this.positions.length - 1];
    }


    public isInactive(): boolean {
        const pos = this.getCurrentPosition();

        if (!pos || Date.now() - pos.position.timestamp.getMs() > MAX_AGE_SEC_INACTIVE * 1000) {
            return true;
        } else {
            return false;
        }
    }


    public getCommonName(): string {
        if (this.opCallsign) {
            return this.opCallsign;
        } else if (this.callsign && !this.isCallsignEqualsRegistration()) {
            return this.callsign;
        } else if (this.registration) {
            return this.registration;
        } else {
            return undefined;
        }
    }


    public isCallsignEqualsRegistration(): boolean {
        const regStripped = this.registration.toUpperCase().replace(/[^A-Z0-9]/g, '');
        const callStripped = this.callsign.toUpperCase().replace(/[^A-Z0-9]/g, '');

        return regStripped === callStripped;
    }
}
