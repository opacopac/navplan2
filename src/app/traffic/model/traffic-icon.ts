import {environment} from '../../../environments/environment';
import {TrafficAircraftType} from './traffic';


export class TrafficIcon {
    public static getUrl(type: TrafficAircraftType, isInactive: boolean): string {
        const src = environment.iconBaseUrl;
        let iconSuffix = '';
        if (isInactive) {
            iconSuffix = '_inactive';
        }

        switch (type) {
            case TrafficAircraftType.POWERED_AIRCRAFT:
            case TrafficAircraftType.DROP_PLANE:
            case TrafficAircraftType.TOW_PLANE:
                return src +  'traffic_plane' + iconSuffix + '.svg';
            case TrafficAircraftType.JET_AIRCRAFT:
                return src + 'traffic_jetplane' + iconSuffix + '.svg';
            case TrafficAircraftType.GLIDER:
                return src + 'traffic_glider' + iconSuffix + '.svg';
            case TrafficAircraftType.HELICOPTER_ROTORCRAFT:
                return src + 'traffic_heli' + iconSuffix + '.svg';
            case TrafficAircraftType.PARACHUTE:
            case TrafficAircraftType.HANG_GLIDER:
            case TrafficAircraftType.PARA_GLIDER:
                return src + 'traffic_parachute' + iconSuffix + '.svg';
            case TrafficAircraftType.BALLOON:
            case TrafficAircraftType.AIRSHIP:
                return src + 'traffic_balloon' + iconSuffix + '.svg';
            case TrafficAircraftType.STATIC_OBJECT:
                return src + 'traffic_static' + iconSuffix + '.svg';
            case TrafficAircraftType.UAV:
                return src + 'traffic_uav' + iconSuffix + '.svg';
            case TrafficAircraftType.UNKNOWN:
            case TrafficAircraftType.UFO:
            default:
                return src + 'traffic_unknown' + iconSuffix + '.svg';
        }
    }
}
