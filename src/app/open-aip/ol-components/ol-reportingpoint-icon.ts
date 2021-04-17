import {environment} from '../../../environments/environment';
import {Reportingpoint} from '../domain-model/reportingpoint';


export class OlReportingpointIcon {
    public static getUrl(reportingPoint: Reportingpoint): string {
        const src = environment.iconBaseUrl;

        if (reportingPoint.inbd_comp && reportingPoint.outbd_comp) {
            return src + 'rp_comp.svg';
        } else if (reportingPoint.inbd_comp || reportingPoint.outbd_comp) {
            return src + 'rp_inbd.svg';
        } else {
            return src + 'rp.svg';
        }
    }
}
