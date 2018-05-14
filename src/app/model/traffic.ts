import { Position4d } from './position';
import { DataItem } from './data-item';


const MAX_AGE_SEC_INACTIVE = 30;


// region ENUMS

export enum TrafficAircraftType {
    'OWN',
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
    ADSBX,
    OWN
}


export enum TrafficPositionMethod {
    FLARM,
    ADSB,
    MLAT,
    OWN
}

// endregion


export class TrafficPosition {
    constructor(
        public position: Position4d,
        public method: TrafficPositionMethod,
        public receiver: string,
        public receivedTimeStampMs: number) {
    }
}


export class Traffic extends DataItem {
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


    public getCurrentTrafficPosition(): TrafficPosition {
        if (!this.positions || this.positions.length === 0) {
            return undefined;
        }

        return this.positions[this.positions.length - 1];
    }


    public isInactive(): boolean {
        const pos = this.getCurrentTrafficPosition();

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
