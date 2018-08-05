import {environment} from '../../../environments/environment';
import {Traffic, TrafficAircraftType} from './traffic';


export class TrafficIcon {
    public static getUrl(type: TrafficAircraftType, isInactive: boolean): string {
        const src = environment.iconBaseUrl;
        let iconSuffix = '';
        if (isInactive) {
            iconSuffix = '_inactive';
        }

        switch (type) {
            case TrafficAircraftType.HELICOPTER_ROTORCRAFT:
                return src + 'traffic_heli' + iconSuffix + '.svg';
            case TrafficAircraftType.GLIDER:
                return src + 'traffic_glider' + iconSuffix + '.svg';
            case TrafficAircraftType.PARACHUTE:
            case TrafficAircraftType.HANG_GLIDER:
            case TrafficAircraftType.PARA_GLIDER:
                return src + 'traffic_parachute' + iconSuffix + '.png';
            case TrafficAircraftType.BALLOON:
            case TrafficAircraftType.AIRSHIP:
                return src + 'traffic_balloon' + iconSuffix + '.png';
            case TrafficAircraftType.UNKNOWN:
                return src + 'traffic_unknown' + iconSuffix + '.png';
            case TrafficAircraftType.STATIC_OBJECT:
                return src + 'traffic_static' + iconSuffix + '.png';
            case TrafficAircraftType.UAV:
                return src + 'traffic_uav' + iconSuffix + '.svg';
            case TrafficAircraftType.JET_AIRCRAFT:
                return src + 'traffic_jetplane' + iconSuffix + '.svg';
            case TrafficAircraftType.POWERED_AIRCRAFT:
            case TrafficAircraftType.DROP_PLANE:
            case TrafficAircraftType.TOW_PLANE:
            case TrafficAircraftType.UFO:
            default:
                return src +  'traffic_plane' + iconSuffix + '.svg';
        }
    }
}
