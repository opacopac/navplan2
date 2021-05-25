import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {Waypoint} from '../../../flightroute/domain-model/waypoint';
import {OlHelper} from '../../../base-map/ol-service/ol-helper';
import {OlOverlayBase} from '../../../base-map/ng-components/ol-overlay-base';


@Component({
    selector: 'app-ol-overlay-waypoint',
    templateUrl: './ol-overlay-waypoint.component.html',
    styleUrls: ['./ol-overlay-waypoint.component.css']
})
export class OlOverlayWaypointComponent extends OlOverlayBase implements OnInit {
    @ViewChild('container') container: ElementRef;
    public waypoint: Waypoint;


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindDataItem(waypoint: Waypoint, clickPos: Position2d) {
        this.waypoint = waypoint;
        this.olOverlay.setPosition(waypoint ? OlHelper.getMercator(waypoint.position) : undefined);
    }
}
