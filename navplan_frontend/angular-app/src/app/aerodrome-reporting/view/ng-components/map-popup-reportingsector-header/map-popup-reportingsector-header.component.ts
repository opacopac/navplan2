import {Component, Input, OnInit} from '@angular/core';
import {ReportingSector} from '../../../domain/model/reporting-sector';
import {MatCardModule} from '@angular/material/card';


@Component({
    selector: 'app-map-popup-reportingsector-header',
    standalone: true,
    imports: [
        MatCardModule
    ],
    templateUrl: './map-popup-reportingsector-header.component.html',
    styleUrls: ['./map-popup-reportingsector-header.component.scss']
})
export class MapPopupReportingsectorHeaderComponent implements OnInit {
    @Input() public reportingsector: ReportingSector;


    ngOnInit() {
    }
}
