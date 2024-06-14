import {Component, OnInit} from '@angular/core';
import {MatRadioChange} from '@angular/material/radio';
import {AltitudeUnit} from '../../../domain/model/geometry/altitude-unit';
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


@Component({
    selector: 'app-unit-settings',
    templateUrl: './unit-settings.component.html',
    styleUrls: ['./unit-settings.component.scss']
})
export class UnitSettingsComponent implements OnInit {
    public readonly selectedAltitudeUnit$: Observable<AltitudeUnit> = this.appStore.pipe(select(getSelectedAltitudeUnit));
    public readonly selectedDistanceUnit$: Observable<LengthUnit> = this.appStore.pipe(select(getSelectedDistanceUnit));
    public readonly selectedSpeedUnit$: Observable<SpeedUnit> = this.appStore.pipe(select(getSelectedSpeedUnit));
    public readonly selectedConsumptionUnit$: Observable<ConsumptionUnit> = this.appStore.pipe(select(getSelectedConsumptionUnit));
    protected readonly altitudeUnitValueAndDescription = [
        [AltitudeUnit.FT, 'ft'],
        [AltitudeUnit.M, 'm']
    ];
    protected readonly distanceUnitValueAndDescription = [
        [LengthUnit.NM, 'NM'],
        [LengthUnit.KM, 'km'],
        [LengthUnit.M, 'm']
    ];
    protected readonly speedUnitValueAndDescription = [
        [SpeedUnit.KT, 'kt'],
        [SpeedUnit.KMH, 'km/h']
    ];
    protected readonly consumptionUnitValueAndDescription = [
        [ConsumptionUnit.L_PER_H, 'l/h'],
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
