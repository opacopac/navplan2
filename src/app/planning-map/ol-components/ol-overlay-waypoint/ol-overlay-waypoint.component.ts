import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Position2d} from '../../../shared/model/geometry/position2d';
import {Waypoint} from '../../../flightroute/model/waypoint';
import {OlOverlayWaypointBase} from '../ol-overlay-waypoint-base';


@Component({
    selector: 'app-ol-overlay-waypoint',
    templateUrl: './ol-overlay-waypoint.component.html',
    styleUrls: ['./ol-overlay-waypoint.component.css']
})
export class OlOverlayWaypointComponent extends OlOverlayWaypointBase implements OnInit {
    public waypoint: Waypoint;
    @ViewChild('container') container: ElementRef;


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindDataItem(waypoint: Waypoint, clickPos: Position2d) {
        this.waypoint = waypoint;
        this.olOverlay.setPosition(waypoint ? waypoint.position.getMercator() : undefined);
    }
}
