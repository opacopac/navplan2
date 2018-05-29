import {
    Traffic,
    TrafficAddressType,
    TrafficAircraftType,
    TrafficDataSource,
    TrafficPosition,
    TrafficPositionMethod
} from "../traffic";
import {Altitude} from "../altitude";
import {UnitconversionService} from "../../services/utils/unitconversion.service";
import {IcaoCallsignService} from "../../services/traffic/icaocallsign.service";
import {Position4d} from "../position";
import {Timestamp} from "../timestamp";

export interface TrafficAdsbExResponse {
    acList: TrafficAdsbExRestItem[];
}


// details: https://www.adsbexchange.com/datafields/
export interface TrafficAdsbExRestItem {
    Icao: string;
    Reg: string;
    OpIcao: string; // operator icao code
    Call: string; // callsign
    Type: string; // type icao code
    Mdl: string; // model icao code
    Species: number;
    EngType: number;
    Lat: number;
    Long: number;
    GAlt: number;
    Gnd: boolean; // is on ground
    PosTime: number; // epoch ms
    Mil: boolean;
    Mlat: boolean;
}


export class RestMapperTrafficAdexbEx {
    public static getTrafficListFromResponse(response: TrafficAdsbExResponse): Traffic[] {
        const trafficList: Traffic[] = [];

        for (const ac of response.acList) {
            const traffic = new Traffic(
                ac.Icao,
                TrafficAddressType.ICAO,
                TrafficDataSource.ADSBX,
                this.getTrafficType(ac),
                ac.Reg,
                this.getCallsign(ac),
                this.getOperatorCallsign(ac),
                ac.Mdl,
                this.getPositionList(ac));
            trafficList.push(traffic);
        }

        return trafficList;
    }


    private static getCallsign(ac: TrafficAdsbExRestItem): string {
        if (!ac.Call) {
            return undefined;
        }

        // no registration -> use call sign
        if (!ac.Reg) {
            return ac.Call;
        }

        // only numbers -> skip
        if (ac.Call.match(/^\d.*/)) {
            return undefined;
        }

        // only 3 letters -> skip
        if (ac.Call.match(/^.{1,3}$/)) {
            return undefined;
        }

        return ac.Call;
    }


    private static getOperatorCallsign(ac: TrafficAdsbExRestItem): string {
        let opCallsign: string;
        let icaoCode: string;

        if (!ac.Call) {
            return undefined;
        }

        // if military but no opcode -> assume tactical call sign
        if (ac.Mil && !ac.OpIcao) {
            return undefined;
        }

        // check for default format (3 letters + 1 digit + 1-3x digit/letter)
        if (ac.Call.toUpperCase().match(/^[A-Z]{3}\d[A-Z0-9]{0,3}/)) {
            icaoCode = ac.Call.substring(0, 3);
            opCallsign = IcaoCallsignService.getIcaoTelephonyDesignator(icaoCode);

            if (opCallsign) {
                return opCallsign + ' ' + ac.Call.substring(3);
            } else {
                return undefined;
            }
        } else if (ac.OpIcao && ac.Call.match(/^\d{1,4}$/)) { // digits only but opcode present-> assume opcode as operator
            icaoCode = ac.OpIcao;
            opCallsign = IcaoCallsignService.getIcaoTelephonyDesignator(icaoCode);

            if (opCallsign) {
                return opCallsign + ' ' + ac.Call;
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }


    private static getPositionList(ac: TrafficAdsbExRestItem): TrafficPosition[] {
        const now = new Date().getTime();

        const pos = new TrafficPosition(
            new Position4d(
                ac.Long,
                ac.Lat,
                new Altitude(ac.Gnd ? undefined : UnitconversionService.ft2m(ac.GAlt)),
                new Timestamp(Math.floor((Math.min(ac.PosTime, now) / 1000)))
            ),
            ac.Mlat ? TrafficPositionMethod.MLAT : TrafficPositionMethod.ADSB,
            ac.Mlat ? 'ADSBExchange (MLAT)' : 'ADSBExchange (ADS-B)',
            now
        );

        const positionList: TrafficPosition[] = []; // will contain only one entry
        positionList.push(pos);

        return positionList;
    }


    private static getTrafficType(ac: TrafficAdsbExRestItem): TrafficAircraftType {
        /* ICAO Special Designators:
        ZZZZ
        Airship 	SHIP
        Balloon 	BALL
        Glider 	GLID
        Microlight aircraft 	ULAC
        Microlight autogyro 	GYRO
        Microlight helicopter 	UHEL
        Sailplane 	GLID
        Ultralight aircraft 	ULAC
        Ultralight autogyro 	GYRO
        Ultralight helicopter 	UHEL
        */

        switch (ac.Type) {
            case 'SHIP':
            case 'BALL':
                return TrafficAircraftType.BALLOON;
            case 'GLID':
                return TrafficAircraftType.GLIDER;
            case 'ULAC':
                return TrafficAircraftType.POWERED_AIRCRAFT;
            case 'UHEL':
            case 'GYRO':
                return TrafficAircraftType.HELICOPTER_ROTORCRAFT;
        }

        /* ADSB Exchange Enums
         VRS.EngineType =
         None: 0,
         Piston: 1,
         Turbo: 2,
         Jet: 3,
         Electric: 4

         VRS.Species =
         None: 0,
         LandPlane: 1,
         SeaPlane: 2,
         Amphibian: 3,
         Helicopter: 4,
         Gyrocopter: 5,
         Tiltwing: 6,
         GroundVehicle: 7,
         Tower: 8 */

        switch (ac.Species) {
            case 1:
            case 2:
            case 3:
            case 6:
                if (ac.EngType === 3) {
                    return TrafficAircraftType.JET_AIRCRAFT;
                } else {
                    return TrafficAircraftType.POWERED_AIRCRAFT;
                }
            case 4:
            case 5:
                return TrafficAircraftType.HELICOPTER_ROTORCRAFT;
            case 8:
                return TrafficAircraftType.STATIC_OBJECT;
            default:
                return TrafficAircraftType.UNKNOWN;
        }
    }
}
