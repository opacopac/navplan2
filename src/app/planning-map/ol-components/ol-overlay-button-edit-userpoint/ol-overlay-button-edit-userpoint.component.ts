import { Component, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../../shared/directives/button-base/button-base.directive';


@Component({
    selector: 'app-ol-overlay-button-edit-userpoint',
    templateUrl: './ol-overlay-button-edit-userpoint.component.html',
    styleUrls: ['./ol-overlay-button-edit-userpoint.component.css']
})
export class OlOverlayButtonEditUserpointComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }


    public onEditUserWaypointClicked(): void {
        // TODO
    }
}
