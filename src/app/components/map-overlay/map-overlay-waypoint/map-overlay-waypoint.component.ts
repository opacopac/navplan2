import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MapOverlayContainer} from "../map-overlay-container";
import {Waypoint} from "../../../model/waypoint";
import {Position2d} from "../../../model/position";
import {Sessioncontext} from "../../../model/sessioncontext";
import {SessionService} from "../../../services/utils/session.service";


@Component({
    selector: 'app-map-overlay-waypoint',
    templateUrl: './map-overlay-waypoint.component.html',
    styleUrls: ['./map-overlay-waypoint.component.css']
})
export class MapOverlayWaypointComponent extends MapOverlayContainer implements OnInit {
    public waypoint: Waypoint;
    private session: Sessioncontext;
    @ViewChild('container') container: ElementRef;


    constructor(private sessionService: SessionService) {
        super();
        this.session = this.sessionService.getSessionContext();
    }


    ngOnInit() {
    }

    public getContainerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindFeatureData(waypoint: Waypoint, clickPos: Position2d) {
        this.waypoint = waypoint;
        this.clickPos = clickPos;
    }


    public getPosition(): Position2d {
        return this.waypoint.position;
    }
}
