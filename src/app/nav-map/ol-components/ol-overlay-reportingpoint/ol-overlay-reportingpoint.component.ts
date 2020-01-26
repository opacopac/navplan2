import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Reportingpoint} from '../../../open-aip/domain/reportingpoint';
import {StringnumberHelper} from '../../../system/use-case/stringnumber/stringnumber-helper';
import {Position2d} from '../../../geo-math/domain/geometry/position2d';
import {OlReportingpointIcon} from '../../../open-aip/ol/ol-reportingpoint-icon';
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
    @ViewChild('container', {static: false}) container: ElementRef;


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
        return StringnumberHelper.getDmsString(this.reportingpoint.position.toArray());
    }


    public getAvatarUrl(): string {
        return OlReportingpointIcon.getUrl(this.reportingpoint);
    }
}
