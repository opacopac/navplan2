import {StringnumberService} from '../../../shared/services/stringnumber/stringnumber.service';
import {TrafficAircraftType} from '../../domain/traffic-aircraft-type';
import {TrafficDetails} from '../../domain/traffic-details';
import {TrafficMap} from '../../domain/traffic-map';
import {Traffic} from '../../domain/traffic';
import {TrafficState} from '../../domain/traffic-state';


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
            ac.acIcao = StringnumberService.getNonNullOrDefault(ac.acIcao, acNew.icaoType, acNew.icaoType);
            ac.registration = StringnumberService.getNonNullOrDefault(ac.registration, acNew.registration, acNew.registration);
            ac.model = StringnumberService.getNonNullOrDefault(ac.model, acNew.model, acNew.model);
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
