import {Component, OnInit} from '@angular/core';
import {MatRadioChange} from '@angular/material/radio';
import {select, Store} from '@ngrx/store';
import {GeoPhysicsActions} from '../../../state/ngrx/geo-physics.actions';
import {Observable} from 'rxjs';
import {
    getAltitudeUnit,
    getPerformanceDistanceUnit,
    getRouteDistanceUnit,
    getSpeedUnit,
    getTemperatureUnit,
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


@Component({
    selector: 'app-unit-settings',
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
    protected readonly speedUnit$: Observable<SpeedUnit> = this.appStore.pipe(select(getSpeedUnit));
    protected readonly volumeUnit$: Observable<VolumeUnit> = this.appStore.pipe(select(getVolumeUnit));
    protected readonly weightUnit$: Observable<WeightUnit> = this.appStore.pipe(select(getWeightUnit));
    protected readonly wnbLengthUnit$: Observable<LengthUnit> = this.appStore.pipe(select(getWnbLengthUnit));
    protected readonly performanceDistanceUnit$: Observable<LengthUnit> = this.appStore.pipe(select(getPerformanceDistanceUnit));
    protected readonly temperatureUnit$: Observable<TemperatureUnit> = this.appStore.pipe(select(getTemperatureUnit));

    protected readonly altitudeUnits = [ LengthUnit.FT, LengthUnit.M ];
    protected readonly routeDistanceUnits = [ LengthUnit.NM, LengthUnit.KM ];
    protected readonly speedUnits = [ SpeedUnit.KT, SpeedUnit.KMH ];
    protected readonly fuelUnits = [ VolumeUnit.L, VolumeUnit.GAL ];
    protected readonly weightUnits = [ WeightUnit.KG, WeightUnit.LBS ];
    protected readonly wnbLengthUnits = [ LengthUnit.M, LengthUnit.IN, LengthUnit.FT ];
    protected readonly performanceDistanceUnits = [ LengthUnit.M, LengthUnit.FT ];
    protected readonly temperatureUnits = [ TemperatureUnit.C, TemperatureUnit.F ];

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
