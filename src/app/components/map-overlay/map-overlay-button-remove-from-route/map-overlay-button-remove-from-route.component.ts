import { Component, OnInit } from '@angular/core';
import {ButtonColor, ButtonSize} from '../../buttons/button-base.directive';


@Component({
    selector: 'app-map-overlay-button-remove-from-route',
    templateUrl: './map-overlay-button-remove-from-route.component.html',
    styleUrls: ['./map-overlay-button-remove-from-route.component.css']
})
export class MapOverlayButtonRemoveFromRouteComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }


    public onRemoveSelectedWaypointClicked() {
    }
}
