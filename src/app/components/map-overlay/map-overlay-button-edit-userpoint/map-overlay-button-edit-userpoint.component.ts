import { Component, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../buttons/button-base.directive';


@Component({
    selector: 'app-map-overlay-button-edit-userpoint',
    templateUrl: './map-overlay-button-edit-userpoint.component.html',
    styleUrls: ['./map-overlay-button-edit-userpoint.component.css']
})
export class MapOverlayButtonEditUserpointComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }
}
