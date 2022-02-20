import {environment} from '../../../../environments/environment';
import {NavaidType} from '../../../enroute/domain-model/navaid-type';
import {Icon} from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';


export class OlNavaidIcon {
    public static readonly NDB = this.createIcon(NavaidType.NDB);
    public static readonly VOR_DME = this.createIcon(NavaidType.VOR_DME);
    public static readonly VOR = this.createIcon(NavaidType.NDB);
    public static readonly DME = this.createIcon(NavaidType.DME);
    public static readonly TACAN = this.createIcon(NavaidType.TACAN);
    public static readonly VORTAC = this.createIcon(NavaidType.VORTAC);


    private static createIcon(type: NavaidType): Icon {
        const src = OlNavaidIcon.getUrl(type);

        return new Icon(({
            anchor: [0.5, 0.5],
            anchorXUnits: IconAnchorUnits.FRACTION,
            anchorYUnits: IconAnchorUnits.FRACTION,
            opacity: 0.9,
            src: src
        }));
    }

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
