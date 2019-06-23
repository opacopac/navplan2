import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Userpoint} from '../../../open-aip/domain/userpoint';
import {Position2d} from '../../../shared/model/geometry/position2d';
import {UserpointIcon} from '../../../open-aip/domain/userpoint-icon';
import {OlOverlayWaypointBase} from '../ol-overlay-waypoint-base';
import {WaypointFactory} from '../../../flightroute/domain/waypoint-mapper/waypoint-factory';
import {OlHelper} from '../../../ol-map/use-case/ol-helper';


@Component({
    selector: 'app-ol-overlay-userpoint',
    templateUrl: './ol-overlay-userpoint.component.html',
    styleUrls: ['./ol-overlay-userpoint.component.css']
})
export class OlOverlayUserpointComponent extends OlOverlayWaypointBase implements OnInit {
    public userpoint: Userpoint;
    @ViewChild('container') container: ElementRef;


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindDataItem(userPoint: Userpoint, clickPos: Position2d) {
        this.userpoint = userPoint;
        this.waypoint = userPoint ? WaypointFactory.createNewWaypointFromDataItem(userPoint, clickPos) : undefined;
        this.olOverlay.setPosition(userPoint ? OlHelper.getMercator(userPoint.position) : undefined);
    }


    public getAvatarUrl(): string {
        return UserpointIcon.getUrl();
    }
}
