import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getCurrentAircraft} from '../../../state/ngrx/aircraft.selectors';
import {Observable, of} from 'rxjs';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {getSelectedSpeedUnit} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';


@Component({
    selector: 'app-aircraft-performance-container',
    templateUrl: './aircraft-performance-container.component.html',
    styleUrls: ['./aircraft-performance-container.component.scss'],
})
export class AircraftPerformanceContainerComponent implements OnInit {
    protected readonly currentAircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly speedUnit$: Observable<SpeedUnit> = this.appStore.pipe(select(getSelectedSpeedUnit));
    protected readonly weightUnit$ = of(WeightUnit.KG); // TODO


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }
}
