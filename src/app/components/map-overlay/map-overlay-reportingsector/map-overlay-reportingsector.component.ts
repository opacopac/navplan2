import { Component, OnInit } from '@angular/core';
import { Reportingsector } from '../../../model/reportingsector';
import { MapOverlayContainer } from '../map-overlay-container';
import { Position2d } from '../../../model/position';


@Component({
    selector: 'app-map-overlay-reportingsector',
    templateUrl: './map-overlay-reportingsector.component.html',
    styleUrls: ['./map-overlay-reportingsector.component.css']
})
export class MapOverlayReportingsectorComponent extends MapOverlayContainer implements OnInit {
    public reportingsector: Reportingsector;
    private container: HTMLElement;


    ngOnInit() {
        this.container = document.getElementById('map-overlay-reportingsector-container');
    }


    public getContainerHtmlElement() {
        return this.container;
    }


    public bindFeatureData(reportingSector: Reportingsector) {
        this.reportingsector = reportingSector;
    }


    public getPosition(clickPos: Position2d): Position2d {
        return clickPos;
    }
}
