import {environment} from '../../../../environments/environment';
import {NavaidType} from '../../../enroute/domain-model/navaid-type';


export class OlNavaidIcon {
    public static getUrl(type: NavaidType): string {
        const src = environment.iconBaseUrl;

        switch (type) {
            case NavaidType.NDB:
                return src + 'navaid_ndb.png';
            case NavaidType.VOR_DME:
            case NavaidType.DVOR_DME:
                return src + 'navaid_vor-dme.svg';
            case NavaidType.VOR:
            case NavaidType.DVOR:
                return src + 'navaid_vor.svg';
            case NavaidType.DME:
                return src + 'navaid_dme.svg';
            case NavaidType.TACAN:
                return src + 'navaid_tacan.svg';
            case NavaidType.VORTAC:
            case NavaidType.DVORTAC:
                return src + 'navaid_vortac.svg';
            default:
                return undefined;
        }
    }
}
