import {Component, Input, OnInit} from '@angular/core';
import {ReportingPoint} from '../../domain-model/reporting-point';
import {OlReportingpointIcon} from '../../ol-components/ol-reportingpoint-icon';


@Component({
    selector: 'app-ol-overlay-reportingpoint-header',
    templateUrl: './ol-overlay-reportingpoint-header.component.html',
    styleUrls: ['./ol-overlay-reportingpoint-header.component.css']
})
export class OlOverlayReportingpointHeaderComponent implements OnInit {
    @Input() public reportingpoint: ReportingPoint;


    ngOnInit() {
    }


    public getAvatarUrl(): string {
        return OlReportingpointIcon.getUrl(this.reportingpoint);
    }
}
