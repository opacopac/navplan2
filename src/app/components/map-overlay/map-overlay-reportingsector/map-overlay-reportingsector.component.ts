import { Component, OnInit } from '@angular/core';
import { Reportingsector } from '../../../model/reportingsector';
import { MapOverlayContent } from '../map-overlay-content';
import { Position2d } from '../../../model/position';


@Component({
    selector: 'app-map-overlay-reportingsector',
    templateUrl: './map-overlay-reportingsector.component.html',
    styleUrls: ['./map-overlay-reportingsector.component.css']
})
export class MapOverlayReportingsectorComponent implements OnInit, MapOverlayContent {
    public reportingsector: Reportingsector;


    constructor() {
    }


    ngOnInit() {
    }


    public bindFeatureData(reportingSector: Reportingsector) {
        this.reportingsector = reportingSector;
    }


    public getTitle(): string {
        return 'ARR Sector';
    }


    public getPosition(clickPos: Position2d): Position2d {
        return clickPos;
    }
}
