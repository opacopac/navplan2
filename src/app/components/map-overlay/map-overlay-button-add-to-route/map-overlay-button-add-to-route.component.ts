import { Component, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../buttons/button-base.directive';


@Component({
    selector: 'app-map-overlay-button-add-to-route',
    templateUrl: './map-overlay-button-add-to-route.component.html',
    styleUrls: ['./map-overlay-button-add-to-route.component.css']
})
export class MapOverlayButtonAddToRouteComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }


    public onAddSelectedWaypointClicked() {
    }
}

