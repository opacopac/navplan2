import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Pressure} from '../../../../geo-physics/domain/model/quantities/pressure';
import {Temperature} from '../../../../geo-physics/domain/model/quantities/temperature';
import {PressureUnit} from '../../../../geo-physics/domain/model/quantities/pressure-unit';
import {TemperatureUnit} from '../../../../geo-physics/domain/model/quantities/temperature-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {PlanPerfWeatherFactorsState} from '../../../state/state-model/plan-perf-weather-factors-state';
import {PlanPerfWeatherCalculationState} from '../../../state/state-model/plan-perf-weather-calculation-state';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
    selector: 'app-plan-perf-weather-factors',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
    ],
    templateUrl: './plan-perf-weather-factors.component.html',
    styleUrls: ['./plan-perf-weather-factors.component.scss']
})
export class PlanPerfWeatherFactorsComponent implements OnInit {
    @Input() weatherFactors: PlanPerfWeatherFactorsState;
    @Input() weatherCalculation: PlanPerfWeatherCalculationState;
    @Input() pressureUnit: PressureUnit;
    @Input() temperatureUnit: TemperatureUnit;
    @Input() altitudeUnit: LengthUnit;
    @Output() weatherFactorsChanged = new EventEmitter<PlanPerfWeatherFactorsState>();

    protected weatherFactorsForm: FormGroup;
    protected readonly Pressure = Pressure;
    protected readonly Temperature = Temperature;
    protected readonly Length = Length;


    constructor(private formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.initForm();
    }


    protected getPaValue() {
        if (this.weatherCalculation && this.weatherCalculation.pressureAltitude) {
            return this.weatherCalculation.pressureAltitude.getValueAndUnit(this.altitudeUnit, 0);
        } else {
            return '-';
        }
    }


    protected getDaValue() {
        if (this.weatherCalculation && this.weatherCalculation.densityAltitude) {
            return this.weatherCalculation.densityAltitude.getValueAndUnit(this.altitudeUnit, 0);
        } else {
            return '-';
        }
    }


    protected getIsaTempValue() {
        if (this.weatherCalculation && this.weatherCalculation.isaTemperature) {
            return this.weatherCalculation.isaTemperature.getValueAndUnit(this.temperatureUnit, 0);
        } else {
            return '-';
        }
    }


    protected onElevationChanged() {
        if (this.weatherFactorsForm.controls['elevation'].valid) {
            this.weatherFactorsChanged.emit({
                ...this.weatherFactors,
                elevation: new Length(this.weatherFactorsForm.value.elevation, this.altitudeUnit)
            });
        }
    }


    protected onQnhChanged() {
        if (this.weatherFactorsForm.controls['qnh'].valid) {
            this.weatherFactorsChanged.emit({
                ...this.weatherFactors,
                qnh: new Pressure(this.weatherFactorsForm.value.qnh, this.pressureUnit)
            });
        }
    }


    protected onOatChanged() {
        if (this.weatherFactorsForm.controls['oat'].valid) {
            this.weatherFactorsChanged.emit({
                ...this.weatherFactors,
                oat: new Temperature(this.weatherFactorsForm.value.oat, this.temperatureUnit)
            });
        }
    }


    private initForm() {
        this.weatherFactorsForm = this.formBuilder.group({
            'elevation': [StringnumberHelper.roundToDigits(this.weatherFactors.elevation.getValue(this.altitudeUnit), 0), [
                Validators.required,
                Validators.min(0)
            ]],
            'qnh': [StringnumberHelper.roundToDigits(this.weatherFactors.qnh.getValue(this.pressureUnit), 0), [
                Validators.required,
                Validators.min(0),
            ]],
            'oat': [StringnumberHelper.roundToDigits(this.weatherFactors.oat.getValue(this.temperatureUnit), 0), [
                Validators.required,
            ]],
        });
    }
}
