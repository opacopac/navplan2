import { Component, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../../shared/directives/button-base/button-base.directive';


@Component({
    selector: 'app-ol-overlay-button-meteogram',
    templateUrl: './ol-overlay-button-meteogram.component.html',
    styleUrls: ['./ol-overlay-button-meteogram.component.css']
})
export class OlOverlayButtonMeteogramComponent implements OnInit {
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
