import { Component, OnInit } from '@angular/core';
import { Sessioncontext } from '../../model/sessioncontext';
import { SessionService } from '../../services/session.service';
import { StringnumberService } from '../../services/stringnumber.service';


@Component({
    selector: 'app-fuelcalc',
    templateUrl: './fuelcalc.component.html',
    styleUrls: ['./fuelcalc.component.css']
})
export class FuelcalcComponent implements OnInit {
    public session: Sessioncontext;


    constructor(private sessionService: SessionService) {
        this.session = sessionService.getSessionContext();
    }


    ngOnInit() {
    }


    formatHourMin(minutes: number): string {
        if (minutes > 0) {
            return StringnumberService.getHourColonMinString(minutes);
        } else {
            return '';
        }
    }


    fuelByTime(minutes: number ): string {
        const fuelByTime = Math.ceil(minutes / 60 * this.session.flightroute.aircraft.consumption);
        return '' + fuelByTime;
    }
}
