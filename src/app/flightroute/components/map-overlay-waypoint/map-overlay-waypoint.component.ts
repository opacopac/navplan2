import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MapOverlayContainer} from '../../../shared/components/map-overlay-container';
import {Position2d} from '../../../shared/model/geometry/position2d';
import {Waypoint} from '../../model/waypoint';


@Component({
    selector: 'app-map-overlay-waypoint',
    templateUrl: './map-overlay-waypoint.component.html',
    styleUrls: ['./map-overlay-waypoint.component.css']
})
export class MapOverlayWaypointComponent extends MapOverlayContainer implements OnInit {
    public waypoint: Waypoint;
    @ViewChild('container') container: ElementRef;


    constructor() {
        super();
    }


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindFeatureData(waypoint: Waypoint, clickPos: Position2d) {
        this.waypoint = waypoint;
        this.olOverlay.setPosition(waypoint ? waypoint.position.getMercator() : undefined);
    }
}
