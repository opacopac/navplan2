import {Component, OnInit} from '@angular/core';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import {select, Store} from '@ngrx/store';
import {GeoPhysicsActions} from '../../../state/ngrx/geo-physics.actions';
import {Observable} from 'rxjs';
import {
    getAltitudeUnit,
    getHorizontalSpeedUnit,
    getPerformanceDistanceUnit,
    getRouteDistanceUnit,
    getTemperatureUnit,
    getVerticalSpeedUnit,
    getVolumeUnit,
    getWeightUnit,
    getWnbLengthUnit
} from '../../../state/ngrx/geo-physics.selectors';
import {LengthUnit} from '../../../domain/model/quantities/length-unit';
import {SpeedUnit} from '../../../domain/model/quantities/speed-unit';
import {Length} from '../../../domain/model/quantities/length';
import {Speed} from '../../../domain/model/quantities/speed';
import {VolumeUnit} from '../../../domain/model/quantities/volume-unit';
import {Volume} from '../../../domain/model/quantities/volume';
import {Weight} from '../../../domain/model/quantities/weight';
import {WeightUnit} from '../../../domain/model/quantities/weight-unit';
import {Temperature} from '../../../domain/model/quantities/temperature';
import {TemperatureUnit} from '../../../domain/model/quantities/temperature-unit';
import {NavplanUnits} from '../../../../common/domain/model/navplan-units';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-unit-settings',
    imports: [
        CommonModule,
        MatRadioModule,
    ],
    templateUrl: './unit-settings.component.html',
    styleUrls: ['./unit-settings.component.scss']
})
export class UnitSettingsComponent implements OnInit {
    protected readonly Volume = Volume;
    protected readonly Speed = Speed;
    protected readonly Length = Length;
    protected readonly Weight = Weight;
    protected readonly Temperature = Temperature;

    protected readonly altitudeUnit$: Observable<LengthUnit> = this.appStore.pipe(select(getAltitudeUnit));
    protected readonly routeDistanceUnit$: Observable<LengthUnit> = this.appStore.pipe(select(getRouteDistanceUnit));
    protected readonly horizontalSpeedUnit$: Observable<SpeedUnit> = this.appStore.pipe(select(getHorizontalSpeedUnit));
    protected readonly verticalSpeedUnit$: Observable<SpeedUnit> = this.appStore.pipe(select(getVerticalSpeedUnit));
    protected readonly volumeUnit$: Observable<VolumeUnit> = this.appStore.pipe(select(getVolumeUnit));
    protected readonly weightUnit$: Observable<WeightUnit> = this.appStore.pipe(select(getWeightUnit));
    protected readonly wnbLengthUnit$: Observable<LengthUnit> = this.appStore.pipe(select(getWnbLengthUnit));
    protected readonly performanceDistanceUnit$: Observable<LengthUnit> = this.appStore.pipe(select(getPerformanceDistanceUnit));
    protected readonly temperatureUnit$: Observable<TemperatureUnit> = this.appStore.pipe(select(getTemperatureUnit));

    protected readonly altitudeUnits = NavplanUnits.altitudeUnits;
    protected readonly routeDistanceUnits = NavplanUnits.routeDistanceUnits;
    protected readonly horizontalSpeedUnits = NavplanUnits.horizontalSpeedUnits;
    protected readonly verticalSpeedUnits = NavplanUnits.verticalSpeedUnits;
    protected readonly fuelUnits = NavplanUnits.fuelUnits;
    protected readonly weightUnits = NavplanUnits.weightUnits;
    protected readonly wnbLengthUnits = NavplanUnits.wnbLengthUnits;
    protected readonly performanceDistanceUnits = NavplanUnits.performanceDistanceUnits;
    protected readonly temperatureUnits = NavplanUnits.temperatureUnits;

    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    protected onAltitudeUnitSelected($event: MatRadioChange) {
        const value = parseInt($event.value, 10);
        this.appStore.dispatch(GeoPhysicsActions.altitudeUnitSelected({lengthUnit: value}));
    }


    protected onRouteDistanceUnitSelected($event: MatRadioChange) {
        const value = parseInt($event.value, 10);
        this.appStore.dispatch(GeoPhysicsActions.routeDistanceUnitSelected({lengthUnit: value}));
    }


    protected onSpeedUnitSelected($event: MatRadioChange) {
        const value = parseInt($event.value, 10);
        this.appStore.dispatch(GeoPhysicsActions.speedUnitSelected({speedUnit: value}));
    }


    protected onVerticalSpeedUnitSelected($event: MatRadioChange) {
        const value = parseInt($event.value, 10);
        this.appStore.dispatch(GeoPhysicsActions.verticalSpeedUnitSelected({speedUnit: value}));
    }


    protected onVolumeUnitSelected($event: MatRadioChange) {
        const value = parseInt($event.value, 10);
        this.appStore.dispatch(GeoPhysicsActions.volumeUnitSelected({volumeUnit: value}));
    }


    protected onWnbLengthUnitSelected($event: MatRadioChange) {
        const value = parseInt($event.value, 10);
        this.appStore.dispatch(GeoPhysicsActions.wnbLengthUnitSelected({lengthUnit: value}));
    }


    protected onWeightUnitSelected($event: MatRadioChange) {
        const value = parseInt($event.value, 10);
        this.appStore.dispatch(GeoPhysicsActions.weightUnitSelected({weightUnit: value}));
    }


    protected onTemperatureUnitSelected($event: MatRadioChange) {
        const value = parseInt($event.value, 10);
        this.appStore.dispatch(GeoPhysicsActions.temperatureUnitSelected({temperatureUnit: value}));
    }


    protected onPerformanceDistanceUnitSelected($event: MatRadioChange) {
        const value = parseInt($event.value, 10);
        this.appStore.dispatch(GeoPhysicsActions.performanceDistanceUnitSelected({lengthUnit: value}));
    }
}
