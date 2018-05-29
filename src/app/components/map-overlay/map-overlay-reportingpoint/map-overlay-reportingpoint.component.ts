import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Reportingpoint } from '../../../model/reportingpoint';
import { StringnumberService } from '../../../services/utils/stringnumber.service';
import { Position2d } from '../../../model/position';
import { MapOverlayContainer } from '../map-overlay-container';
import {Sessioncontext} from "../../../model/sessioncontext";
import {SessionService} from "../../../services/utils/session.service";


@Component({
    selector: 'app-map-overlay-reportingpoint',
    templateUrl: './map-overlay-reportingpoint.component.html',
    styleUrls: ['./map-overlay-reportingpoint.component.css']
})
export class MapOverlayReportingpointComponent extends MapOverlayContainer implements OnInit {
    public reportingpoint: Reportingpoint;
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


    public bindFeatureData(reportingPoint: Reportingpoint, clickPos: Position2d) {
        this.reportingpoint = reportingPoint;
        this.clickPos = clickPos;
    }


    public getPosition(): Position2d {
        return this.reportingpoint.position;
    }


    public getPositionString(): string {
        return StringnumberService.getDmsString(this.reportingpoint.position.getLonLat());
    }
}
