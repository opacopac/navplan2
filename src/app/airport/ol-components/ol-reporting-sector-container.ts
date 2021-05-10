import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {Observable, Subscription} from 'rxjs';
import VectorLayer from 'ol/layer/Vector';
import {ReportingSector} from '../domain-model/reporting-sector';
import {OlReportingSector} from './ol-reporting-sector';


export class OlReportingSectorContainer extends OlComponentBase {
    private readonly reportingSectorSubscription: Subscription;


    constructor(
        private readonly reportingSectorLayer: VectorLayer,
        reportingSector$: Observable<ReportingSector[]>
    ) {
        super();

        this.reportingSectorSubscription = reportingSector$.subscribe((reportingSectors) => {
            this.clearFeatures();
            this.addFeatures(reportingSectors);
        });
    }


    public get isSelectable(): boolean {
        return false;
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
