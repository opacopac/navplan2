import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Reportingsector } from '../../model/reportingsector';
import { MapOverlayContainer } from '../../../shared/components/map-overlay-container';
import { Position2d } from '../../../shared/model/geometry/position2d';


@Component({
    selector: 'app-map-overlay-reportingsector',
    templateUrl: './map-overlay-reportingsector.component.html',
    styleUrls: ['./map-overlay-reportingsector.component.css']
})
export class MapOverlayReportingsectorComponent extends MapOverlayContainer implements OnInit {
    public reportingsector: Reportingsector;
    @ViewChild('container') container: ElementRef;


    constructor() {
        super();
    }


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindFeatureData(reportingSector: Reportingsector, clickPos: Position2d) {
        this.reportingsector = reportingSector;
        this.olOverlay.setPosition(clickPos ? clickPos.getMercator() : undefined);
    }
}
