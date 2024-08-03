import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getCurrentAircraft} from '../../../state/ngrx/aircraft.selectors';
import {getWeightUnit, getWnbLengthUnit} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {Weight} from '../../../../geo-physics/domain/model/quantities/weight';
import {AircraftWnbActions} from '../../../state/ngrx/aircraft-wnb-actions';
import {WeightItem} from '../../../domain/model/weight-item';


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

    protected onChangeBew(bew: Weight) {
        this.appStore.dispatch(
            AircraftWnbActions.changeBew({bew: bew})
        );
    }

    protected onChangeMtow(mtow: Weight) {
        this.appStore.dispatch(
            AircraftWnbActions.changeMtow({mtow: mtow})
        );
    }

    protected onAddWeightItem(weightItem: WeightItem) {
        this.appStore.dispatch(
            AircraftWnbActions.addWeightItem({weightItem: weightItem})
        );
    }


    protected onDeleteWeightItem(weightItemIndex: number) {
        this.appStore.dispatch(
            AircraftWnbActions.deleteWeightItem({weightItemIndex: weightItemIndex})
        );
    }
}
