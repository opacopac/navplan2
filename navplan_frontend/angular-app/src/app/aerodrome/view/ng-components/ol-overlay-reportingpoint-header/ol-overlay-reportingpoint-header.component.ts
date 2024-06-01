import {Component, Input, OnInit} from '@angular/core';
import {ReportingPoint} from '../../../domain/model/reporting-point';
import {OlReportingPointIcon} from '../../ol-components/reporting-point-sector/ol-reporting-point-icon';


@Component({
    selector: 'app-ol-overlay-reportingpoint-header',
    templateUrl: './ol-overlay-reportingpoint-header.component.html',
    styleUrls: ['./ol-overlay-reportingpoint-header.component.scss']
})
export class OlOverlayReportingpointHeaderComponent implements OnInit {
    @Input() public reportingpoint: ReportingPoint;


    ngOnInit() {
    }


    public getAvatarUrl(): string {
        return OlReportingPointIcon.getUrl(this.reportingpoint.inbd_comp, this.reportingpoint.outbd_comp);
    }
}
