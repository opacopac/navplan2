import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../map-features/domain/airport';

@Component({
    selector: 'app-ol-overlay-airport-notam-tab',
    templateUrl: './ol-overlay-airport-notam-tab.component.html',
    styleUrls: ['./ol-overlay-airport-notam-tab.component.css']
})
export class OlOverlayAirportNotamTabComponent implements OnInit {
    @Input() airport: Airport;


    constructor() {
    }


    ngOnInit() {
    }


    public getName(): string {
        if (this.airport.icao) {
            return this.airport.icao;
        } else {
            return this.airport.name;
        }
    }
}
