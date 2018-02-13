import { Component, Input, OnInit } from '@angular/core';
import { Notam } from '../../../model/notam';

@Component({
    selector: 'app-map-overlay-button-notam',
    templateUrl: './map-overlay-button-notam.component.html',
    styleUrls: ['./map-overlay-button-notam.component.css']
})
export class MapOverlayButtonNotamComponent implements OnInit {
    public notamList: Notam[];


    constructor() {
    }


    ngOnInit() {
    }


    public onShowAirportNotams() {
    }
}
