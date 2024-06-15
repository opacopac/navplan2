import {Component, OnInit} from '@angular/core';
import {MatRadioChange} from '@angular/material/radio';
import {select, Store} from '@ngrx/store';
import {GeoPhysicsActions} from '../../../state/ngrx/geo-physics.actions';
import {Observable} from 'rxjs';
import {
    getSelectedAltitudeUnit,
    getSelectedConsumptionUnit,
    getSelectedDistanceUnit,
    getSelectedSpeedUnit
} from '../../../state/ngrx/geo-physics.selectors';
import {LengthUnit} from '../../../domain/model/quantities/length-unit';
import {SpeedUnit} from '../../../domain/model/quantities/speed-unit';
import {ConsumptionUnit} from '../../../domain/model/quantities/consumption-unit';
import { Length } from '../../../domain/model/quantities/length';
import { Speed } from '../../../domain/model/quantities/speed';


@Component({
    selector: 'app-unit-settings',
    templateUrl: './unit-settings.component.html',
    styleUrls: ['./unit-settings.component.scss']
})
export class UnitSettingsComponent implements OnInit {
    public readonly selectedAltitudeUnit$: Observable<LengthUnit> = this.appStore.pipe(select(getSelectedAltitudeUnit));
    public readonly selectedDistanceUnit$: Observable<LengthUnit> = this.appStore.pipe(select(getSelectedDistanceUnit));
    public readonly selectedSpeedUnit$: Observable<SpeedUnit> = this.appStore.pipe(select(getSelectedSpeedUnit));
    public readonly selectedConsumptionUnit$: Observable<ConsumptionUnit> = this.appStore.pipe(select(getSelectedConsumptionUnit));
    protected readonly altitudeUnitValueAndDescription = [
        [LengthUnit.FT, Length.getUnitString(LengthUnit.FT)],
        [LengthUnit.M, Length.getUnitString(LengthUnit.M)]
    ];
    protected readonly distanceUnitValueAndDescription = [
        [LengthUnit.NM, Length.getUnitString(LengthUnit.NM)],
        [LengthUnit.KM, Length.getUnitString(LengthUnit.KM)],
        [LengthUnit.M, Length.getUnitString(LengthUnit.M)]
    ];
    protected readonly speedUnitValueAndDescription = [
        [SpeedUnit.KT, Speed.getUnitString(SpeedUnit.KT)],
        [SpeedUnit.KMH, Speed.getUnitString(SpeedUnit.KMH)],
    ];
    protected readonly consumptionUnitValueAndDescription = [
        [ConsumptionUnit.L_PER_H, 'l/h'], // TODO
        [ConsumptionUnit.GAL_PER_H, 'gal/h']
    ];


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    protected onAltitudeUnitSelected($event: MatRadioChange) {
        const value = parseInt($event.value, 10);
        this.appStore.dispatch(GeoPhysicsActions.altitudeUnitSelected({altitudeUnit: value}));
    }


    protected onDistanceUnitSelected($event: MatRadioChange) {
        const value = parseInt($event.value, 10);
        this.appStore.dispatch(GeoPhysicsActions.distanceUnitSelected({distanceUnit: value}));
    }


    protected onSpeedUnitSelected($event: MatRadioChange) {
        const value = parseInt($event.value, 10);
        this.appStore.dispatch(GeoPhysicsActions.speedUnitSelected({speedUnit: value}));
    }


    protected onConsumptionUnitSelected($event: MatRadioChange) {
        const value = parseInt($event.value, 10);
        this.appStore.dispatch(GeoPhysicsActions.consumptionUnitSelected({consumptionUnit: value}));
    }
}
