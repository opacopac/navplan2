import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Userpoint } from '../../model/userpoint';
import { Position2d } from '../../../shared/model/geometry/position2d';
import { MapOverlayContainer } from '../../../shared/components/map-overlay-container';


@Component({
    selector: 'app-map-overlay-userpoint',
    templateUrl: './map-overlay-userpoint.component.html',
    styleUrls: ['./map-overlay-userpoint.component.css']
})
export class MapOverlayUserpointComponent extends MapOverlayContainer implements OnInit {
    public userpoint: Userpoint;
    @ViewChild('container') container: ElementRef;


    constructor() {
        super();
    }


    ngOnInit() {
    }


    public get containerHtmlElement(): HTMLElement {
        return this.container.nativeElement;
    }


    public bindFeatureData(userPoint: Userpoint, clickPos: Position2d) {
        this.userpoint = userPoint;
        this.olOverlay.setPosition(userPoint ? userPoint.position.getMercator() : undefined);
    }
}
