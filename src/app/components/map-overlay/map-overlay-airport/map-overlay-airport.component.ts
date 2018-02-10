import { Component, Input, OnInit } from '@angular/core';
import { Airport } from '../../../model/airport';

@Component({
    selector: 'app-map-overlay-airport',
    templateUrl: './map-overlay-airport.component.html',
    styleUrls: ['./map-overlay-airport.component.css']
})
export class MapOverlayAirportComponent implements OnInit {
    @Input() airport: Airport;


    constructor() {
    }


    ngOnInit() {
    }
}