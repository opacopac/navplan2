import { Component, OnInit } from '@angular/core';
import { Reportingpoint } from '../../../model/reportingpoint';
import { StringnumberService } from '../../../services/utils/stringnumber.service';
import { MapOverlayContent } from '../map-overlay-content';
import { Position2d } from '../../../model/position';


@Component({
    selector: 'app-map-overlay-reportingpoint',
    templateUrl: './map-overlay-reportingpoint.component.html',
    styleUrls: ['./map-overlay-reportingpoint.component.css']
})
export class MapOverlayReportingpointComponent implements OnInit, MapOverlayContent {
    public reportingpoint: Reportingpoint;


    constructor() {
    }


    ngOnInit() {
    }


    public bindFeatureData(reportingPoint: Reportingpoint) {
        this.reportingpoint = reportingPoint;
    }


    public getTitle(): string {
        return 'Reporting Point';
    }


    public getPosition(clickPos: Position2d): Position2d {
        return this.reportingpoint.position;
    }


    public getPositionString(): string {
        return StringnumberService.getDmsString(this.reportingpoint.position.getLonLat());
    }
}
