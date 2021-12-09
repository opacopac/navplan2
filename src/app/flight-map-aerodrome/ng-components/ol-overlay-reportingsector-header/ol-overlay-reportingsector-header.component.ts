import {Component, Input, OnInit} from '@angular/core';
import {ReportingSector} from '../../../aerodrome/domain-model/reporting-sector';


@Component({
    selector: 'app-ol-overlay-reportingsector-header',
    templateUrl: './ol-overlay-reportingsector-header.component.html',
    styleUrls: ['./ol-overlay-reportingsector-header.component.css']
})
export class OlOverlayReportingsectorHeaderComponent implements OnInit {
    @Input() public reportingsector: ReportingSector;


    ngOnInit() {
    }
}
