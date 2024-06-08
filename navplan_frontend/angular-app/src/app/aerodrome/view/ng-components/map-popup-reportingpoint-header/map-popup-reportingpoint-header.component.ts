import {Component, Input, OnInit} from '@angular/core';
import {ReportingPoint} from '../../../domain/model/reporting-point';
import {OlReportingPointIcon} from '../../ol-components/reporting-point-sector/ol-reporting-point-icon';


@Component({
    selector: 'app-map-popup-reportingpoint-header',
    templateUrl: './map-popup-reportingpoint-header.component.html',
    styleUrls: ['./map-popup-reportingpoint-header.component.scss']
})
export class MapPopupReportingpointHeaderComponent implements OnInit {
    @Input() public reportingpoint: ReportingPoint;


    ngOnInit() {
    }


    public getAvatarUrl(): string {
        return OlReportingPointIcon.getUrl(this.reportingpoint.inbd_comp, this.reportingpoint.outbd_comp);
    }
}
