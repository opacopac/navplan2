import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Userpoint} from '../../../map-features/model/userpoint';
import {Position2d} from '../../../shared/model/geometry/position2d';
import {UserpointIcon} from '../../../map-features/model/userpoint-icon';
import {OlOverlayWaypointBase} from '../ol-overlay-waypoint-base';


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
        this.olOverlay.setPosition(userPoint ? userPoint.position.getMercator() : undefined);
    }


    public getAvatarUrl(): string {
        return UserpointIcon.getUrl();
    }
}