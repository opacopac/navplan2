import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { FlighttimerService } from '../../services/flighttimer.service';


@Component({
    selector: 'app-flighttimer',
    templateUrl: './flighttimer.component.html',
    styleUrls: ['./flighttimer.component.css']
})
export class FlighttimerComponent implements OnInit {
    constructor(
        public timerService: FlighttimerService,
        public locationService: LocationService) {
    }

    ngOnInit() {
    }
}
