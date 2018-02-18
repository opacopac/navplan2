import { Component, OnInit } from '@angular/core';
import {ButtonColor, ButtonSize} from '../../buttons/button-base.directive';


@Component({
    selector: 'app-map-overlay-button-set-alternate',
    templateUrl: './map-overlay-button-set-alternate.component.html',
    styleUrls: ['./map-overlay-button-set-alternate.component.css']
})
export class MapOverlayButtonSetAlternateComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }


    public onSetAlternateClicked() {
    }
}
