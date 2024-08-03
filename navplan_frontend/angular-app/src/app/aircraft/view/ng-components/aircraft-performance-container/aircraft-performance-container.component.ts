import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getCurrentAircraft} from '../../../state/ngrx/aircraft.selectors';
import {Observable} from 'rxjs';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {
    getAltitudeUnit,
    getPerformanceDistanceUnit,
    getSpeedUnit,
    getTemperatureUnit,
    getWeightUnit
} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';


@Component({
    selector: 'app-aircraft-performance-container',
    templateUrl: './aircraft-performance-container.component.html',
    styleUrls: ['./aircraft-performance-container.component.scss'],
})
export class AircraftPerformanceContainerComponent implements OnInit {
    protected readonly currentAircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly speedUnit$: Observable<SpeedUnit> = this.appStore.pipe(select(getSpeedUnit));
    protected readonly weightUnit$ = this.appStore.pipe(select(getWeightUnit));
    protected readonly temperatureUnit$ = this.appStore.pipe(select(getTemperatureUnit));
    protected readonly distanceUnit$ = this.appStore.pipe(select(getPerformanceDistanceUnit));
    protected readonly altitudeUnit$ = this.appStore.pipe(select(getAltitudeUnit));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }
}
