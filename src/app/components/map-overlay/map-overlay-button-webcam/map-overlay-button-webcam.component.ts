import { Component, Input, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../buttons/button-base.directive';
import { Webcam } from '../../../model/webcam';


@Component({
    selector: 'app-map-overlay-button-webcam',
    templateUrl: './map-overlay-button-webcam.component.html',
    styleUrls: ['./map-overlay-button-webcam.component.css']
})
export class MapOverlayButtonWebcamComponent implements OnInit {
    @Input() webcam: Webcam;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }


    public onWebcamClicked() {
        window.open(this.webcam.url, '_blank');
    }
}
