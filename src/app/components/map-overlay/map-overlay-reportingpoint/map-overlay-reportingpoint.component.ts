import { Component, Input, OnInit } from '@angular/core';
import { Reportingpoint } from '../../../model/reportingpoint';
import { StringnumberService } from '../../../services/utils/stringnumber.service';


@Component({
    selector: 'app-map-overlay-reportingpoint',
    templateUrl: './map-overlay-reportingpoint.component.html',
    styleUrls: ['./map-overlay-reportingpoint.component.css']
})
export class MapOverlayReportingpointComponent implements OnInit {
    @Input() reportingpoint: Reportingpoint;


    constructor() {
    }


    ngOnInit() {
    }


    public getPositionString(): string {
        return StringnumberService.getDmsString(this.reportingpoint.position.getLonLat());
    }
}
