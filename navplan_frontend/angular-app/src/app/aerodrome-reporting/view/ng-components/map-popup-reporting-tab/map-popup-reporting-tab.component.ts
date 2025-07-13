import {Component, Input, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {ReportingPointsAndSectors} from '../../../domain/model/reporting-points-and-sectors';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {User} from '../../../../user/domain/model/user';
import {ReportingType} from '../../../domain/model/reporting-type';


@Component({
    selector: 'app-map-popup-reporting-tab',
    imports: [
        MatTableModule,
        MatButtonModule,
        MatTooltipModule,
    ],
    templateUrl: './map-popup-reporting-tab.component.html',
    styleUrls: ['./map-popup-reporting-tab.component.scss']
})
export class MapPopupReportingTabComponent implements OnInit {
    @Input() reportingPointsAndSectors: ReportingPointsAndSectors;
    @Input() currentUser: User;


    constructor() {
    }


    ngOnInit() {
    }


    protected getColumns(): string[] {
        return ['type', 'name', 'is_heli'];
    }


    protected getTypeString(type: ReportingType): string {
        switch (type) {
            case ReportingType.POINT:
                return 'Point';
            case ReportingType.SECTOR:
                return 'Sector';
            default:
                return 'Unknown';
        }
    }


    protected onAddReportingClicked() {
        // TODO
    }
}
