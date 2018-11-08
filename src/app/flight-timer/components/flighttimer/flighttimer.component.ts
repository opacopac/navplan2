import {Component, OnInit} from '@angular/core';
import {TimerService} from '../../../shared/services/timer/timer.service';
import {getLocationIsWatching} from '../../../location/location.selectors';
import {select, Store} from '@ngrx/store';
import {DatetimeService} from '../../../shared/services/datetime/datetime.service';


@Component({
    selector: 'app-flighttimer',
    templateUrl: './flighttimer.component.html',
    styleUrls: ['./flighttimer.component.css']
})
export class FlighttimerComponent implements OnInit {
    public locationIsWatching$ = this.appStore.pipe(select(getLocationIsWatching));


    constructor(
        private appStore: Store<any>,
        public timerService: TimerService) {
    }


    ngOnInit() {
    }




    /*public getStopTimeString(stopTime: Date): string {
        if (stopTime) {
            return DatetimeService.getHourMinSecStringFromDate(stopTime);
        } else {
            return '';
        }
    }


    public getElapsedTimeString(elapsedTime: Date): string {
        if (elapsedTime) {
            const diffMs = this.currentTime.getTime() - stopTime.getTime();
            return '+' + DatetimeService.getMinSecStringFromDate(new Date(diffMs));
        } else {
            return '';
        }
    }*/
}
