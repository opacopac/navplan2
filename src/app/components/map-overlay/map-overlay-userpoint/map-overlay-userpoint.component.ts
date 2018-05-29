import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Userpoint } from '../../../model/userpoint';
import { Position2d } from '../../../model/position';
import { MapOverlayContainer } from '../map-overlay-container';
import {Sessioncontext} from "../../../model/sessioncontext";
import {SessionService} from "../../../services/utils/session.service";


@Component({
    selector: 'app-map-overlay-userpoint',
    templateUrl: './map-overlay-userpoint.component.html',
    styleUrls: ['./map-overlay-userpoint.component.css']
})
export class MapOverlayUserpointComponent extends MapOverlayContainer implements OnInit {
    public userpoint: Userpoint;
    private session: Sessioncontext;
    @ViewChild('container') container: ElementRef;


    constructor(
        private sessionService: SessionService
    ) {
        super();
        this.session = this.sessionService.getSessionContext();
    }


    ngOnInit() {
    }


    public getContainerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindFeatureData(userPoint: Userpoint, clickPos: Position2d) {
        this.userpoint = userPoint;
        this.clickPos = clickPos;
    }


    public getPosition(): Position2d {
        return this.userpoint.position;
    }
}
