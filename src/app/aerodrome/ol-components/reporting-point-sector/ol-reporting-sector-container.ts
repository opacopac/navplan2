import {Observable, Subscription} from 'rxjs';
import {ReportingSector} from '../../domain-model/reporting-sector';
import {OlReportingSector} from './ol-reporting-sector';
import {OlVectorLayer} from '../../../base-map/ol-model/ol-vector-layer';


export class OlReportingSectorContainer {
    private readonly reportingSectorSubscription: Subscription;


    constructor(
        private readonly reportingSectorLayer: OlVectorLayer,
        reportingSectors$: Observable<ReportingSector[]>
    ) {
        this.reportingSectorSubscription = reportingSectors$.subscribe((reportingSectors) => {
            this.clearFeatures();
            this.drawFeatures(reportingSectors);
        });
    }


    public destroy() {
        this.reportingSectorSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(reportingSectors: ReportingSector[]) {
        if (reportingSectors) {
            reportingSectors.forEach(repSec => OlReportingSector.draw(repSec, this.reportingSectorLayer));
        }
    }


    private clearFeatures() {
        this.reportingSectorLayer.clear();
    }
}
