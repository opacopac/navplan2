import {AircraftClass, EngineClass, TrafficDetails} from '../model/traffic-details';


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
    'ac_type': string;
    'ac_class': string;
    'eng_class': string;
}


export class RestMapperTrafficDetails {
    public static getTrafficDetailsListFromResponse(response: TrafficDetailsResponse): TrafficDetails[] {
        if (!response.acdetails) {
            return [];
        }

        return response.acdetails.map(ac => new TrafficDetails(
            ac.icao24.toString().toUpperCase(),
            ac.reg,
            ac.model,
            ac.manufacturer,
            ac.ac_type,
            this.getAircraftClass(ac.ac_class),
            this.getEngineClass(ac.eng_class)
        ));
    }


    private static getAircraftClass(ac_class: string): AircraftClass {
        if (!ac_class) {
            return AircraftClass.UNKNOWN;
        }

        switch (ac_class.toUpperCase()) {
            case 'A': return AircraftClass.AMPHIBIAN;
            case 'G': return AircraftClass.GYROCOPTER;
            case 'H': return AircraftClass.HELICOPTER;
            case 'L': return AircraftClass.LANDPLANE;
            case 'S': return AircraftClass.SEAPLANE;
            case 'T': return AircraftClass.TILTROTOR;
            default:
                return AircraftClass.UNKNOWN;
        }
    }


    private static getEngineClass(eng_class: string): EngineClass {
        if (!eng_class) {
            return EngineClass.UNKNOWN;
        }

        switch (eng_class.toUpperCase()) {
            case 'E': return EngineClass.ELECTRIC;
            case 'J': return EngineClass.JET;
            case 'P': return EngineClass.PISTON;
            case 'R': return EngineClass.ROCKET;
            case 'T': return EngineClass.TURBOPROP;
            default:
                return EngineClass.UNKNOWN;
        }
    }
}
