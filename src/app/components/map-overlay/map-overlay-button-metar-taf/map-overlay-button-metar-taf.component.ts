import { Component, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../buttons/button-base.directive';


@Component({
    selector: 'app-map-overlay-button-metar-taf',
    templateUrl: './map-overlay-button-metar-taf.component.html',
    styleUrls: ['./map-overlay-button-metar-taf.component.css']
})
export class MapOverlayButtonMetarTafComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }


    public onShowMetarTaf() {
        // TODO
    }
}
