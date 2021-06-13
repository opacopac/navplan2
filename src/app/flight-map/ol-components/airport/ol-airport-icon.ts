import {environment} from '../../../../environments/environment';
import {AirportType} from '../../../aerodrome/domain-model/airport-type';


export class OlAirportIcon {
    public static getUrl(type: AirportType): string {
        const src = environment.iconBaseUrl;

        switch (type) {
            case AirportType.APT:
            case AirportType.INTL_APT:
                return src + 'ad_civ.svg';
            case AirportType.AF_CIVIL:
            case AirportType.GLIDING:
            case AirportType.LIGHT_AIRCRAFT:
                return src + 'ad_civ_nofac.svg';
            case AirportType.AF_MIL_CIVIL:
                return src + 'ad_civmil.svg';
            case AirportType.HELI_CIVIL:
                return src + 'ad_heli.svg';
            case AirportType.HELI_MIL:
                return src + 'ad_heli_mil.svg';
            case AirportType.AF_WATER:
                return src + 'ad_water.svg';
            case AirportType.AD_MIL:
                return src + 'ad_mil.svg';
            case AirportType.AD_CLOSED:
                return src + 'ad_closed.svg';
            default:
                return undefined;
        }
    }


    public static getRwyUrl(rwy_surface: string, isMilitary: boolean): string {
        const src = environment.iconBaseUrl;

        if (isMilitary) {
            return src + 'rwy_mil.svg';
        } else if (rwy_surface === 'ASPH' || rwy_surface === 'CONC') {
            return src + 'rwy_concrete.svg';
        } else if (rwy_surface !== 'WATE') {
            return src + 'rwy_grass.svg';
        } else {
            return undefined;
        }
    }
}
