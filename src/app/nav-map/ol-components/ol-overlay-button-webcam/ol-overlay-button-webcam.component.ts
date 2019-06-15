import { Component, Input, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../../shared/directives/button-base/button-base.directive';
import {Webcam} from '../../../map-features/domain/webcam';


@Component({
    selector: 'app-ol-overlay-button-webcam',
    templateUrl: './ol-overlay-button-webcam.component.html',
    styleUrls: ['./ol-overlay-button-webcam.component.css']
})
export class OlOverlayButtonWebcamComponent implements OnInit {
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
