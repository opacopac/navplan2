import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pressure} from '../../../../geo-physics/domain/model/quantities/pressure';
import {Temperature} from '../../../../geo-physics/domain/model/quantities/temperature';
import {PressureUnit} from '../../../../geo-physics/domain/model/quantities/pressure-unit';
import {TemperatureUnit} from '../../../../geo-physics/domain/model/quantities/temperature-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {PlanPerfWeatherFactorsState} from '../../../state/state-model/plan-perf-weather-factors-state';

@Component({
    selector: 'app-plan-perf-weather-factors',
    templateUrl: './plan-perf-weather-factors.component.html',
    styleUrls: ['./plan-perf-weather-factors.component.scss']
})
export class PlanPerfWeatherFactorsComponent implements OnInit {
    @Input() weatherFactors: PlanPerfWeatherFactorsState;
    @Input() pressureUnit: PressureUnit;
    @Input() temperatureUnit: TemperatureUnit;
    @Input() altitudeUnit: LengthUnit;
    @Output() weatherFactorsChanged = new EventEmitter<PlanPerfWeatherFactorsState>();

    protected weatherFactorsForm: FormGroup;
    protected readonly Pressure = Pressure;
    protected readonly Temperature = Temperature;


    constructor(private formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.initForm();
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
            'qnh': [this.weatherFactors.qnh.getValue(this.pressureUnit), [
                Validators.required,
                Validators.min(0),
            ]],
            'oat': [this.weatherFactors.oat.getValue(this.temperatureUnit), [
                Validators.required,
            ]],
        });
    }
}
