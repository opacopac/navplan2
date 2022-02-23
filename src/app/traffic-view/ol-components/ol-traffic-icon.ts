import {environment} from '../../../environments/environment';
import {TrafficAircraftType} from '../../traffic/domain-model/traffic-aircraft-type';
import {Icon} from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {Angle} from '../../geo-physics/domain-model/quantities/angle';


export class OlTrafficIcon {
    public static getIcon(type: TrafficAircraftType, isInactive: boolean, rotation: number, rotWithView: boolean): Icon {
        const iconUrl = this.getUrl(type, isInactive);

        return new Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: IconAnchorUnits.FRACTION,
            anchorYUnits: IconAnchorUnits.FRACTION,
            scale: 1,
            opacity: 1.00,
            rotation: Angle.deg2rad(rotation),
            rotateWithView: rotWithView,
            src: iconUrl
        });
    }


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
