import {environment} from '../../../../environments/environment';
import {ReportingPoint} from '../../../aerodrome/domain-model/reporting-point';


export class OlReportingpointIcon {
    public static getUrl(reportingPoint: ReportingPoint): string {
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
