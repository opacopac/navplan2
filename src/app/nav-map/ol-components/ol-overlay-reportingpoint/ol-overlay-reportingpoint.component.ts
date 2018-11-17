import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Reportingpoint} from '../../../map-features/model/reportingpoint';
import {StringnumberService} from '../../../shared/services/stringnumber/stringnumber.service';
import {Position2d} from '../../../shared/model/geometry/position2d';
import {ReportingpointIcon} from '../../../map-features/model/reportingpoint-icon';
import {OlOverlayWaypointBase} from '../ol-overlay-waypoint-base';


@Component({
    selector: 'app-ol-overlay-reportingpoint',
    templateUrl: './ol-overlay-reportingpoint.component.html',
    styleUrls: ['./ol-overlay-reportingpoint.component.css']
})
export class OlOverlayReportingpointComponent extends OlOverlayWaypointBase implements OnInit {
    public reportingpoint: Reportingpoint;
    @ViewChild('container') container: ElementRef;


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindDataItem(reportingPoint: Reportingpoint, clickPos: Position2d) {
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