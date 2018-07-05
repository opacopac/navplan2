import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../core/services/location/location.service';
import { TimerService } from '../../core/services/utils/timer.service';


@Component({
    selector: 'app-flighttimer',
    templateUrl: './flighttimer.component.html',
    styleUrls: ['./flighttimer.component.css']
})
export class FlighttimerComponent implements OnInit {
    constructor(
        public timerService: TimerService,
        public locationService: LocationService) {
    }

    ngOnInit() {
    }
}
