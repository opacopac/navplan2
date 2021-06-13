import {Observable, Subscription} from 'rxjs';
import VectorLayer from 'ol/layer/Vector';
import {ReportingSector} from '../../../aerodrome/domain-model/reporting-sector';
import {OlReportingSector} from './ol-reporting-sector';


export class OlReportingSectorContainer {
    private readonly reportingSectorSubscription: Subscription;


    constructor(
        private readonly reportingSectorLayer: VectorLayer,
        reportingSectors$: Observable<ReportingSector[]>
    ) {
        this.reportingSectorSubscription = reportingSectors$.subscribe((reportingSectors) => {
            this.clearFeatures();
            this.addFeatures(reportingSectors);
        });
    }


    public destroy() {
        this.reportingSectorSubscription.unsubscribe();
        this.clearFeatures();
    }


    private addFeatures(reportingSectors: ReportingSector[]) {
        if (reportingSectors) {
            reportingSectors.forEach(repSec => new OlReportingSector(repSec, this.reportingSectorLayer));
        }
    }


    private clearFeatures() {
        this.reportingSectorLayer.getSource().clear(true);
    }
}
