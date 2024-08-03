import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getCurrentAircraft} from '../../../state/ngrx/aircraft.selectors';
import {getWeightUnit, getWnbLengthUnit} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';


@Component({
    selector: 'app-aircraft-weight-and-balance-container',
    templateUrl: './aircraft-weight-and-balance-container.component.html',
    styleUrls: ['./aircraft-weight-and-balance-container.component.scss'],
})
export class AircraftWeightAndBalanceContainerComponent implements OnInit {
    protected readonly currentAircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly weightUnit$ = this.appStore.pipe(select(getWeightUnit));
    protected readonly lengthUnit$ = this.appStore.pipe(select(getWnbLengthUnit));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }
}
