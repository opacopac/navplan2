import {environment} from '../../../../../environments/environment';
import {AirportType} from '../../../domain/model/airport-type';
import {Icon} from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';


export class OlAirportIcon {
    public static readonly APT = this.createIcon(AirportType.APT);
    public static readonly AF_CIVIL = this.createIcon(AirportType.AF_CIVIL);
    public static readonly AF_MIL_CIVIL = this.createIcon(AirportType.AF_MIL_CIVIL);
    public static readonly HELI_CIVIL = this.createIcon(AirportType.HELI_CIVIL);
    public static readonly HELI_MIL = this.createIcon(AirportType.HELI_MIL);
    public static readonly AF_WATER = this.createIcon(AirportType.AF_WATER);
    public static readonly AD_MIL = this.createIcon(AirportType.AD_MIL);
    public static readonly AD_CLOSED = this.createIcon(AirportType.AD_CLOSED);


    public static getUrl(type: AirportType): string {
        const src = environment.iconBaseUrl;

        switch (type) {
            case AirportType.APT:
            case AirportType.INTL_APT:
                return src + 'ad_civ.svg';
            case AirportType.AF_CIVIL:
            case AirportType.GLIDING:
            case AirportType.LIGHT_AIRCRAFT:
            case AirportType.AF_MOUNTAIN:
                return src + 'ad_civ_nofac.svg';
            case AirportType.AF_MIL_CIVIL:
                return src + 'ad_civmil.svg';
            case AirportType.HELI_CIVIL:
            case AirportType.HELI_HOSPITAL:
            case AirportType.HELI_MOUNTAIN:
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


    private static createIcon(type: AirportType): Icon {
        const src = this.getUrl(type);

        return new Icon(({
            anchor: [0.5, 0.5],
            anchorXUnits: IconAnchorUnits.FRACTION,
            anchorYUnits: IconAnchorUnits.FRACTION,
            scale: 1,
            opacity: 0.9,
            src: src,
        }));
    }
}
