import { Component, OnInit } from '@angular/core';
import { Reportingpoint } from '../../../model/reportingpoint';
import { StringnumberService } from '../../../services/utils/stringnumber.service';
import { Position2d } from '../../../model/position';
import { MapOverlayContainer } from '../map-overlay-container';


@Component({
    selector: 'app-map-overlay-reportingpoint',
    templateUrl: './map-overlay-reportingpoint.component.html',
    styleUrls: ['./map-overlay-reportingpoint.component.css']
})
export class MapOverlayReportingpointComponent extends MapOverlayContainer implements OnInit {
    public reportingpoint: Reportingpoint;
    private container: HTMLElement;


    ngOnInit() {
        this.container = document.getElementById('map-overlay-reportingpoint-container');
    }


    public getContainerHtmlElement() {
        return this.container;
    }


    public bindFeatureData(reportingPoint: Reportingpoint) {
        this.reportingpoint = reportingPoint;
    }


    public getPosition(clickPos: Position2d): Position2d {
        return this.reportingpoint.position;
    }


    public getPositionString(): string {
        return StringnumberService.getDmsString(this.reportingpoint.position.getLonLat());
    }
}
