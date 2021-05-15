import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ReportingSector} from '../../../aerodrome/domain-model/reporting-sector';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {OlOverlayWaypointBase} from '../ol-overlay-waypoint-base';
import {WaypointFactory} from '../../../flightroute/domain-model/waypoint-mapper/waypoint-factory';
import {OlHelper} from '../../../base-map/ol-service/ol-helper';


@Component({
    selector: 'app-ol-overlay-reportingsector',
    templateUrl: './ol-overlay-reportingsector.component.html',
    styleUrls: ['./ol-overlay-reportingsector.component.css']
})
export class OlOverlayReportingsectorComponent extends OlOverlayWaypointBase implements OnInit {
    public reportingsector: ReportingSector;
    @ViewChild('container') container: ElementRef;


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindDataItem(reportingSector: ReportingSector, clickPos: Position2d) {
        this.reportingsector = reportingSector;
        this.waypoint = reportingSector ? WaypointFactory.createNewWaypointFromDataItem(reportingSector, clickPos) : undefined;
        this.olOverlay.setPosition(clickPos ? OlHelper.getMercator(clickPos) : undefined);
    }
}
