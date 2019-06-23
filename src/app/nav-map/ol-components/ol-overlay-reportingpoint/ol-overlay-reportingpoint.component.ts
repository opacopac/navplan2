import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Reportingpoint} from '../../../open-aip/domain/reportingpoint';
import {StringnumberService} from '../../../shared/services/stringnumber/stringnumber.service';
import {Position2d} from '../../../shared/model/geometry/position2d';
import {ReportingpointIcon} from '../../../open-aip/domain/reportingpoint-icon';
import {OlOverlayWaypointBase} from '../ol-overlay-waypoint-base';
import {WaypointFactory} from '../../../flightroute/domain/waypoint-mapper/waypoint-factory';
import {OlHelper} from '../../../ol-map/use-case/ol-helper';


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
        this.waypoint = reportingPoint ? WaypointFactory.createNewWaypointFromDataItem(reportingPoint, clickPos) : undefined;
        this.olOverlay.setPosition(reportingPoint ? OlHelper.getMercator(reportingPoint.position) : undefined);
    }


    public getPositionString(): string {
        return StringnumberService.getDmsString(this.reportingpoint.position.toArray());
    }


    public getAvatarUrl(): string {
        return ReportingpointIcon.getUrl(this.reportingpoint);
    }
}
