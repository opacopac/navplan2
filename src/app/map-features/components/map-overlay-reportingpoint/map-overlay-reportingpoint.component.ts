import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Reportingpoint} from '../../model/reportingpoint';
import {StringnumberService} from '../../../shared/services/stringnumber/stringnumber.service';
import {Position2d} from '../../../shared/model/geometry/position2d';
import {MapOverlayContainer} from '../../../shared/components/map-overlay-container';
import {ReportingpointIcon} from '../../model/reportingpoint-icon';


@Component({
    selector: 'app-map-overlay-reportingpoint',
    templateUrl: './map-overlay-reportingpoint.component.html',
    styleUrls: ['./map-overlay-reportingpoint.component.css']
})
export class MapOverlayReportingpointComponent extends MapOverlayContainer implements OnInit {
    public reportingpoint: Reportingpoint;
    @ViewChild('container') container: ElementRef;


    constructor() {
        super();
    }


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindFeatureData(reportingPoint: Reportingpoint, clickPos: Position2d) {
        this.reportingpoint = reportingPoint;
        this.olOverlay.setPosition(reportingPoint ? reportingPoint.position.getMercator() : undefined);
    }


    public getPositionString(): string {
        return StringnumberService.getDmsString(this.reportingpoint.position.getLonLat());
    }


    public getAvatarUrl(): string {
        return ReportingpointIcon.getUrl(this.reportingpoint);
    }
}
