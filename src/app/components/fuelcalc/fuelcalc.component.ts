import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatetimeService} from '../../services/utils/datetime.service';
import {SessionService} from '../../services/session/session.service';
import {Sessioncontext} from '../../model/sessioncontext';
import {Time} from '../../model/units/time';
import {Observable} from 'rxjs/Observable';
import {Fuel} from '../../model/units/fuel';
import {VolumeUnit} from '../../services/utils/unitconversion.service';


@Component({
    selector: 'app-fuelcalc',
    templateUrl: './fuelcalc.component.html',
    styleUrls: ['./fuelcalc.component.css']
})
export class FuelcalcComponent implements OnInit, OnDestroy {
    public session: Sessioncontext;
    public Time = Time;
    public Fuel = Fuel;


    constructor(
        private sessionService: SessionService) {

        this.session = this.sessionService.getSessionContext();
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    get fuelTimes$(): Observable<FuelTimes> {
        return this.session.flightroute$
            .filter(route => route !== undefined)
            .flatMap(route => Observable.combineLatest(
                route.fuel.tripTime$,
                route.fuel.alternateTime$,
                route.fuel.extraTime$,
                route.fuel.reserveTime$,
                route.fuel.totalTime$,
                route.fuel.tripFuel$,
                route.fuel.alternateFuel$,
                route.fuel.extraFuel$,
                route.fuel.reserveFuel$,
                route.fuel.totalFuel$,
                ([tripTime, alternateTime, extraTime, reserveTime, totalTime,
                     tripFuel, alternateFuel, extraFuel, reserveFuel, totalFuel]) =>
                new FuelTimes(tripTime, alternateTime, extraTime, reserveTime, totalTime,
                    tripFuel, alternateFuel, extraFuel, reserveFuel, totalFuel)
            ));
    }


    // TODO
    public formatTime(time: Time): string {
        if (time && time.min > 0) {
            return DatetimeService.getHourMinStringFromMinutes(time.min);
        } else {
            return '';
        }
    }


    // TODO
    public formatFuel(fuel: Fuel): string {
        if (fuel) {
            return '' + fuel.getValue(VolumeUnit.L);
        } else {
            return '';
        }
    }
}



export class FuelTimes {
    constructor(
        public tripTime: Time,
        public alternateTime: Time,
        public extraTime: Time,
        public reserveTime: Time,
        public totalTime: Time,
        public tripFuel: Fuel,
        public alternateFuel: Fuel,
        public extraFuel: Fuel,
        public reserveFuel: Fuel,
        public totalFuel: Fuel) {
    }
}
