import {Component, OnInit} from '@angular/core';
import {MatRadioChange} from '@angular/material/radio';
import {select, Store} from '@ngrx/store';
import {GeoPhysicsActions} from '../../../state/ngrx/geo-physics.actions';
import {Observable} from 'rxjs';
import {
    getFuelUnit,
    getSelectedAltitudeUnit,
    getSelectedDistanceUnit,
    getSelectedSpeedUnit
} from '../../../state/ngrx/geo-physics.selectors';
import {LengthUnit} from '../../../domain/model/quantities/length-unit';
import {SpeedUnit} from '../../../domain/model/quantities/speed-unit';
import {Length} from '../../../domain/model/quantities/length';
import {Speed} from '../../../domain/model/quantities/speed';
import {VolumeUnit} from '../../../domain/model/quantities/volume-unit';
import {Volume} from '../../../domain/model/quantities/volume';


@Component({
    selector: 'app-unit-settings',
    templateUrl: './unit-settings.component.html',
    styleUrls: ['./unit-settings.component.scss']
})
export class UnitSettingsComponent implements OnInit {
    protected readonly selectedAltitudeUnit$: Observable<LengthUnit> = this.appStore.pipe(select(getSelectedAltitudeUnit));
    protected readonly selectedDistanceUnit$: Observable<LengthUnit> = this.appStore.pipe(select(getSelectedDistanceUnit));
    protected readonly selectedSpeedUnit$: Observable<SpeedUnit> = this.appStore.pipe(select(getSelectedSpeedUnit));
    protected readonly selectedFuelUnit$: Observable<VolumeUnit> = this.appStore.pipe(select(getFuelUnit));
    protected readonly Volume = Volume;
    protected readonly Speed = Speed;
    protected readonly Length = Length;
    protected readonly altitudeUnitValueAndDescription = Length.unitsAndDescriptions
        .filter(u => u[0] === LengthUnit.FT || u[0] === LengthUnit.M);
    protected readonly distanceUnitValueAndDescription = Length.unitsAndDescriptions
        .filter(u => u[0] === LengthUnit.NM || u[0] === LengthUnit.KM);


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


    protected onVolumeUnitSelected($event: MatRadioChange) {
        const value = parseInt($event.value, 10);
        this.appStore.dispatch(GeoPhysicsActions.fuelUnitSelected({fuelUnit: value}));
    }
}
