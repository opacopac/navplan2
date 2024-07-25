import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getCurrentAircraft} from '../../../state/ngrx/aircraft.selectors';
import {Observable} from 'rxjs';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {getSelectedSpeedUnit} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';


@Component({
    selector: 'app-aircraft-performance-container',
    templateUrl: './aircraft-performance-container.component.html',
    styleUrls: ['./aircraft-performance-container.component.scss'],
})
export class AircraftPerformanceContainerComponent implements OnInit {
    protected readonly currentAircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly speedUnit$: Observable<SpeedUnit> = this.appStore.pipe(select(getSelectedSpeedUnit));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }
}
