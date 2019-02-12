import {Traffic, TrafficAddressType, TrafficAircraftType, TrafficDataSource} from '../model/traffic';


export interface TrafficDetailsRequest {
    action: string;
    aclist: TrafficDetailsRequestItem[];
}


export interface TrafficDetailsRequestItem {
    icao24: string;
    ac_type: string;
}


export interface TrafficDetailsResponse {
    'acdetails': TrafficDetailsRestItem[];
}


export interface TrafficDetailsRestItem {
    'icao24': string;
    'reg': string;
    'model': string;
    'manufacturer': string;
    'ac_type': string; // 4-characters
    'ac_class': string; // A=Amphibian, G=Gyrocopter, H=Helicopter, L=Landplane, S=Seaplane, T=Tiltrotor
    'eng_class': string; // E=Electric, J=Jet, P=Piston, R=Rocket, T=Turboprop
}


export class RestMapperTrafficDetails {
    public static getTrafficListFromResponse(response: TrafficDetailsResponse): Traffic[] {
        if (!response.acdetails) {
            return [];
        }

        return response.acdetails.map(ac => new Traffic(
            ac.icao24.toString().toUpperCase(),
            TrafficAddressType.ICAO,
            TrafficDataSource.DETAILS,
            this.getAircraftType(ac),
            ac.ac_type,
            ac.reg,
            undefined,
            undefined,
            ac.model,
            []
        ));
    }


    private static getAircraftType(restItem: TrafficDetailsRestItem): TrafficAircraftType {
        if (!restItem.ac_class) {
            return TrafficAircraftType.UNKNOWN;
        }

        switch (restItem.ac_class) {
            case 'H': // HELICOPTER
            case 'G': // GYROCOPTER
                return TrafficAircraftType.HELICOPTER_ROTORCRAFT;
            case 'L': // LANDPLANE
            case 'S': // SEAPLANE
            case 'A': // AMPHIBIAN
                return this.isJetEngine(restItem) ? TrafficAircraftType.JET_AIRCRAFT : TrafficAircraftType.POWERED_AIRCRAFT;
            case 'T': // TILTROTOR
                return TrafficAircraftType.POWERED_AIRCRAFT;
            default:
                return TrafficAircraftType.UNKNOWN;
        }
    }


    private static isJetEngine(restItem: TrafficDetailsRestItem): boolean {
        if (!restItem.eng_class) {
            return false;
        }

        switch (restItem.eng_class) {
            case 'J': // JET
            case 'R': // ROCKET
                return true;
            case 'P': // PISTON
            case 'E': // ELECTRIC
            case 'T': // TURBOPROP
            default:
                return false;
        }
    }
}
