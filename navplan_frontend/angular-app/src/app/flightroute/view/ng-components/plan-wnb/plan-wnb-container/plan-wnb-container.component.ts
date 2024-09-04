import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {getFlightroute} from '../../../../state/ngrx/flightroute.selectors';
import {
    getVolumeUnit,
    getWeightUnit,
    getWnbLengthUnit
} from '../../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {Consumption} from '../../../../../geo-physics/domain/model/quantities/consumption';
import {getPlanWnbWeightItems} from '../../../../state/ngrx/plan-wnb.selectors';
import {WeightItem} from '../../../../../aircraft/domain/model/weight-item';
import {Weight} from '../../../../../geo-physics/domain/model/quantities/weight';
import {PlanWnbActions} from '../../../../state/ngrx/plan-wnb.actions';
import {Volume} from '../../../../../geo-physics/domain/model/quantities/volume';
import {getCurrentAircraft} from '../../../../../aircraft/state/ngrx/aircraft.selectors';
import {WeightItemType} from '../../../../../aircraft/domain/model/weight-item-type';
import {WnbEnvelopeCoordinate} from '../../../../../aircraft/domain/model/wnb-envelope-coordinate';
import {WnbEnvelopeArmDirection} from '../../../../../aircraft/domain/model/wnb-envelope-arm-direction';

@Component({
    selector: 'app-plan-wnb-container',
    templateUrl: './plan-wnb-container.component.html',
    styleUrls: ['./plan-wnb-container.component.scss']
})
export class PlanWnbContainerComponent implements OnInit {
    protected readonly Consumption = Consumption;
    protected readonly currentAircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly weightItems$ = this.appStore.pipe(select(getPlanWnbWeightItems));
    protected readonly zeroFuelCoordinate$ = this.weightItems$.pipe(
        map(items => items.find(wi => wi.type === WeightItemType.ZERO_FUEL_WEIGHT)),
        map(wi => new WnbEnvelopeCoordinate(wi.weight, wi.armLong))
    );
    protected readonly takeoffCoordinate$ = this.weightItems$.pipe(
        map(items => items.find(wi => wi.type === WeightItemType.TAKEOFF_WEIGHT)),
        map(wi => new WnbEnvelopeCoordinate(wi.weight, wi.armLong))
    );
    protected readonly envelopes$ = this.currentAircraft$.pipe(map(aircraft => aircraft ? aircraft.wnbEnvelopes : []));
    protected readonly flightroute$ = this.appStore.pipe(select(getFlightroute));
    protected readonly routeFuel$ = this.flightroute$.pipe(map(flightroute => flightroute.fuel.blockFuel));
    protected readonly weightUnit$ = this.appStore.pipe(select(getWeightUnit));
    protected readonly lengthUnit$ = this.appStore.pipe(select(getWnbLengthUnit));
    protected readonly volumeUnit$ = this.appStore.pipe(select(getVolumeUnit));


    constructor(
        private appStore: Store<any>
    ) {
    }


    ngOnInit() {
    }


    protected getArmDirectionText(armDirection: WnbEnvelopeArmDirection): string {
        return armDirection === WnbEnvelopeArmDirection.LONGITUDINAL ? 'Longitudinal' : 'Lateral';
    }


    protected onWeightItemChanged($event: [WeightItem, Weight, Volume]) {
        this.appStore.dispatch(PlanWnbActions.weightOfItemChanged({
            weightItem: $event[0],
            newWeight: $event[1],
            newFuel: $event[2]
        }));
    }
}
