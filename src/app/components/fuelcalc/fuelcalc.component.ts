import * as Rx from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatetimeService } from '../../services/utils/datetime.service';
import { Flightroute } from "../../model/flightroute";
import { FlightrouteService } from "../../services/flightroute/flightroute.service";


@Component({
    selector: 'app-fuelcalc',
    templateUrl: './fuelcalc.component.html',
    styleUrls: ['./fuelcalc.component.css']
})
export class FuelcalcComponent implements OnInit, OnDestroy {
    public currentFlightroute: Flightroute;
    private currentFlightrouteSubscription: Rx.Subscription;


    constructor(
        private flightrouteService: FlightrouteService) {
    }


    // region component life cycle

    ngOnInit() {
        this.currentFlightrouteSubscription = this.flightrouteService.currentRoute$.subscribe(
            currentFlightroute => { this.currentFlightroute = currentFlightroute; }
        );
    }


    ngOnDestroy() {
        this.currentFlightrouteSubscription.unsubscribe();
    }

    // endregion



    public formatHourMin(minutes: number): string {
        if (minutes > 0) {
            return DatetimeService.getHourMinStringFromMinutes(minutes);
        } else {
            return '';
        }
    }


    public fuelByTime(minutes: number ): string {
        const fuelByTime = Math.ceil(minutes / 60 * this.currentFlightroute.aircraft.consumption);
        return '' + fuelByTime;
    }
}
