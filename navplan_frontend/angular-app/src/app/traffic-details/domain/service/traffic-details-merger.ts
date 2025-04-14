import {StringnumberHelper} from '../../../system/domain/service/stringnumber/stringnumber-helper';
import {TrafficAircraftType} from '../../../traffic/domain/model/traffic-aircraft-type';
import {TrafficDetails} from '../model/traffic-details';
import {TrafficMap} from '../../../traffic/domain/model/traffic-map';
import {Traffic} from '../../../traffic/domain/model/traffic';
import {TrafficState} from '../../../traffic/state/state-model/traffic-state';


export class TrafficDetailsMerger {
    public static merge(state: TrafficState, trafficDetailsList: TrafficDetails[]) {
        const newTrafficMap = state.trafficMap.clone();

        for (const acNew of trafficDetailsList) {
            const trafficKey = TrafficMap.getKey(acNew.address);
            let ac = newTrafficMap.get(trafficKey);

            if (!ac) {
                ac = Traffic.createEmpty(acNew.address);
                newTrafficMap.set(trafficKey, ac);
            }

            ac.acType = this.mergeAcType(ac.acType, acNew);
            ac.acIcao = StringnumberHelper.getNonNullOrDefault(ac.acIcao, acNew.icaoType, acNew.icaoType);
            ac.registration = StringnumberHelper.getNonNullOrDefault(ac.registration, acNew.registration, acNew.registration);
            ac.model = StringnumberHelper.getNonNullOrDefault(ac.model, acNew.model, acNew.model);
            ac.isDetailsLoaded = true;
        }

        newTrafficMap.removeOutdatedTraffic(state.maxTrafficAgeSec);

        return newTrafficMap;
    }


    private static mergeAcType(oldAcType: TrafficAircraftType, acNew: TrafficDetails): TrafficAircraftType {
        if (!oldAcType || oldAcType === TrafficAircraftType.UNKNOWN) {
            return this.getAircraftType(acNew);
        } else {
            return oldAcType;
        }
    }


    private static getAircraftType(ac: TrafficDetails): TrafficAircraftType {
        // TODO
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

        /* switch (ac.icaotype)
        {
            case 'SHIP':
            case 'BALL':
                return "BALLOON";
                break;
            case 'GLID':
                return "GLIDER";
                break;
            case 'ULAC':
                return "POWERED_AIRCRAFT";
                break;
            case 'UHEL':
            case 'GYRO':
                return "HELICOPTER_ROTORCRAFT";
                break;
        } */

        if (!ac.acClass) {
            return TrafficAircraftType.UNKNOWN;
        }

        switch (ac.acClass) {
            case 'H': // HELICOPTER
            case 'G': // GYROCOPTER
                return TrafficAircraftType.HELICOPTER_ROTORCRAFT;
            case 'L': // LANDPLANE
            case 'S': // SEAPLANE
            case 'A': // AMPHIBIAN
                return this.isJetEngine(ac) ? TrafficAircraftType.JET_AIRCRAFT : TrafficAircraftType.POWERED_AIRCRAFT;
            case 'T': // TILTROTOR
                return TrafficAircraftType.POWERED_AIRCRAFT;
            default:
                return TrafficAircraftType.UNKNOWN;
        }
    }


    private static isJetEngine(ac: TrafficDetails): boolean {
        if (!ac.engClass) {
            return false;
        }

        switch (ac.engClass) {
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
