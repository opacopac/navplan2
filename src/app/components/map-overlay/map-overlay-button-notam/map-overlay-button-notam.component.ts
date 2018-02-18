import { Component, OnInit } from '@angular/core';
import { Notam } from '../../../model/notam';
import { ButtonColor, ButtonSize } from '../../buttons/button-base.directive';


@Component({
    selector: 'app-map-overlay-button-notam',
    templateUrl: './map-overlay-button-notam.component.html',
    styleUrls: ['./map-overlay-button-notam.component.css']
})
export class MapOverlayButtonNotamComponent implements OnInit {
    public notamList: Notam[];
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }


    public onShowAirportNotams() {
    }
}
