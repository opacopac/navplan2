import {environment} from '../../../../environments/environment';
import {Icon} from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';


export class OlReportingPointIcon {
    private static readonly IN_OUT = this.createIcon(true, true);
    private static readonly IN = this.createIcon(true, false);
    private static readonly NONE = this.createIcon(false, false);


    public static getUrl(inbd_comp: boolean, outbd_comp: boolean): string {
        const src = environment.iconBaseUrl;

        if (inbd_comp && outbd_comp) {
            return src + 'rp_comp.svg';
        } else if (inbd_comp || outbd_comp) {
            return src + 'rp_inbd.svg';
        } else {
            return src + 'rp.svg';
        }
    }


    public static getIcon(inbd_comp: boolean, outbd_comp: boolean): Icon {
        if (inbd_comp && outbd_comp) {
            return this.IN_OUT;
        } else if (inbd_comp || outbd_comp) {
            return this.IN;
        } else {
            return this.NONE;
        }
    }


    private static createIcon(inbd_comp: boolean, outbd_comp: boolean): Icon {
        const src = this.getUrl(inbd_comp, outbd_comp);

        return new Icon(({
            anchor: [0.5, 0.5],
            anchorXUnits: IconAnchorUnits.FRACTION,
            anchorYUnits: IconAnchorUnits.FRACTION,
            scale: 1,
            opacity: 0.9,
            src: src
        }));
    }
}
