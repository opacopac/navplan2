import { Component, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../buttons/button-base.directive';


@Component({
    selector: 'app-map-overlay-button-edit-waypoint',
    templateUrl: './map-overlay-button-edit-waypoint.component.html',
    styleUrls: ['./map-overlay-button-edit-waypoint.component.css']
})
export class MapOverlayButtonEditWaypointComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }


    public onEditWaypointClicked() {
    }
}
