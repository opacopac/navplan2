import { Component, OnInit } from '@angular/core';
import { Userpoint } from '../../../model/userpoint';
import { Position2d } from '../../../model/position';
import { MapOverlayContainer } from '../map-overlay-container';


@Component({
    selector: 'app-map-overlay-userpoint',
    templateUrl: './map-overlay-userpoint.component.html',
    styleUrls: ['./map-overlay-userpoint.component.css']
})
export class MapOverlayUserpointComponent extends MapOverlayContainer implements OnInit {
    public userpoint: Userpoint;
    private container: HTMLElement;


    ngOnInit() {
        this.container = document.getElementById('map-overlay-userpoint-container');
    }


    public getContainerHtmlElement() {
        return this.container;
    }


    public bindFeatureData(userPoint: Userpoint) {
        this.userpoint = userPoint;
    }


    public getPosition(clickPos: Position2d): Position2d {
        return this.userpoint.position;
    }
}
