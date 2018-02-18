import { Component, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../buttons/button-base.directive';


@Component({
    selector: 'app-map-overlay-button-webcam',
    templateUrl: './map-overlay-button-webcam.component.html',
    styleUrls: ['./map-overlay-button-webcam.component.css']
})
export class MapOverlayButtonWebcamComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }
}
