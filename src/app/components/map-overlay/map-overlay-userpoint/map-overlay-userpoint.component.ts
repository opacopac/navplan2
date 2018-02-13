import { Component, OnInit } from '@angular/core';
import { Userpoint } from '../../../model/userpoint';
import { StringnumberService } from '../../../services/utils/stringnumber.service';
import { MapOverlayContent } from '../map-overlay-content';
import { Position2d } from '../../../model/position';


@Component({
    selector: 'app-map-overlay-userpoint',
    templateUrl: './map-overlay-userpoint.component.html',
    styleUrls: ['./map-overlay-userpoint.component.css']
})
export class MapOverlayUserpointComponent implements OnInit, MapOverlayContent {
    public userpoint: Userpoint;


    constructor() {
    }


    ngOnInit() {
    }


    public bindFeatureData(userPoint: Userpoint) {
        this.userpoint = userPoint;
    }


    public getTitle(): string {
        return 'User Point';
    }


    public getPosition(clickPos: Position2d): Position2d {
        return this.userpoint.position;
    }


    public getPositionString(): string {
        return StringnumberService.getDmsString(this.userpoint.position.getLonLat());
    }
}
