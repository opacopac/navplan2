import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Reportingpoint} from '../../../open-aip/domain-model/reportingpoint';
import {StringnumberHelper} from '../../../system/domain-service/stringnumber/stringnumber-helper';
import {Position2d} from '../../../geo-math/domain-model/geometry/position2d';
import {OlReportingpointIcon} from '../../../open-aip/ol-components/ol-reportingpoint-icon';
import {OlOverlayWaypointBase} from '../ol-overlay-waypoint-base';
import {WaypointFactory} from '../../../flightroute/domain-model/waypoint-mapper/waypoint-factory';
import {OlBaseMapService} from '../../../base-map/ol-service/ol-base-map.service';


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
        this.olOverlay.setPosition(reportingPoint ? OlBaseMapService.getMercator(reportingPoint.position) : undefined);
    }


    public getPositionString(): string {
        return StringnumberHelper.getDmsString(this.reportingpoint.position.toArray());
    }


    public getAvatarUrl(): string {
        return OlReportingpointIcon.getUrl(this.reportingpoint);
    }
}
