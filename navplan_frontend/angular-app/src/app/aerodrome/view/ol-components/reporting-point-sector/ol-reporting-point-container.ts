import {Observable, Subscription} from 'rxjs';
import {ReportingPoint} from '../../../domain/model/reporting-point';
import {OlReportingPoint} from './ol-reporting-point';
import {OlVectorLayer} from '../../../../base-map/view/ol-model/ol-vector-layer';


export class OlReportingPointContainer {
    private readonly reportingPointSubscription: Subscription;


    constructor(
        private readonly reportingPointLayer: OlVectorLayer,
        reportingPoints$: Observable<ReportingPoint[]>
    ) {
        this.reportingPointSubscription = reportingPoints$.subscribe((reportingPoints) => {
            this.clearFeatures();
            this.drawFeatures(reportingPoints);
        });
    }


    public destroy() {
        this.reportingPointSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(reportingPoints: ReportingPoint[]) {
        if (reportingPoints) {
            reportingPoints.forEach(repPoint => OlReportingPoint.draw(repPoint, this.reportingPointLayer));
        }
    }


    private clearFeatures() {
        this.reportingPointLayer.clear();
    }
}
