import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Reportingsector } from '../../../model/reportingsector';
import { MapOverlayContainer } from '../map-overlay-container';
import { Position2d } from '../../../model/geometry/position2d';
import {Sessioncontext} from "../../../model/session/sessioncontext";
import {SessionService} from "../../../services/session/session.service";


@Component({
    selector: 'app-map-overlay-reportingsector',
    templateUrl: './map-overlay-reportingsector.component.html',
    styleUrls: ['./map-overlay-reportingsector.component.css']
})
export class MapOverlayReportingsectorComponent extends MapOverlayContainer implements OnInit {
    public reportingsector: Reportingsector;
    private session: Sessioncontext;
    @ViewChild('container') container: ElementRef;


    constructor(
        private sessionService: SessionService
    ) {
        super();
        this.session = this.sessionService.getSessionContext();
    }


    ngOnInit() {
    }


    public getContainerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindFeatureData(reportingSector: Reportingsector, clickPos: Position2d) {
        this.reportingsector = reportingSector;
        this.clickPos = clickPos;
    }


    public getPosition(): Position2d {
        return this.clickPos;
    }
}
