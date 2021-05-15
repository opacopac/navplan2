import {Observable, Subscription} from 'rxjs';
import VectorLayer from 'ol/layer/Vector';
import {ReportingPoint} from '../domain-model/reporting-point';
import {OlReportingPoint} from './ol-reporting-point';


export class OlReportingPointContainer {
    private readonly reportingPointSubscription: Subscription;


    constructor(
        private readonly reportingPointLayer: VectorLayer,
        reportingPoints$: Observable<ReportingPoint[]>
    ) {
        this.reportingPointSubscription = reportingPoints$.subscribe((reportingPoints) => {
            this.clearFeatures();
            this.addFeatures(reportingPoints);
        });
    }


    public destroy() {
        this.reportingPointSubscription.unsubscribe();
        this.clearFeatures();
    }


    private addFeatures(reportingPoints: ReportingPoint[]) {
        if (reportingPoints) {
            reportingPoints.forEach(repPoint => new OlReportingPoint(repPoint, this.reportingPointLayer));
        }
    }


    private clearFeatures() {
        this.reportingPointLayer.getSource().clear(true);
    }
}
