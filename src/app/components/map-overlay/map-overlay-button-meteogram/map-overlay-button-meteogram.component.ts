import { Component, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../buttons/button-base.directive';


@Component({
    selector: 'app-map-overlay-button-meteogram',
    templateUrl: './map-overlay-button-meteogram.component.html',
    styleUrls: ['./map-overlay-button-meteogram.component.css']
})
export class MapOverlayButtonMeteogramComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }


    public onShowWeather() {
        // TODO
    }
}
