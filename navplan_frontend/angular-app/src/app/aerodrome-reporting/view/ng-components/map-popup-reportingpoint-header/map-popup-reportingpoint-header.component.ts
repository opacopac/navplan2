import {Component, Input, OnInit} from '@angular/core';
import {ReportingPoint} from '../../../domain/model/reporting-point';
import {OlReportingPointIcon} from '../../ol-components/ol-reporting-point-icon';
import {MatCardModule} from '@angular/material/card';


@Component({
    selector: 'app-map-popup-reportingpoint-header',
    imports: [
        MatCardModule
    ],
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
