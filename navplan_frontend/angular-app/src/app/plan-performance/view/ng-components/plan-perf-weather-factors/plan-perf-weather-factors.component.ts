import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pressure} from '../../../../geo-physics/domain/model/quantities/pressure';
import {Temperature} from '../../../../geo-physics/domain/model/quantities/temperature';
import {PressureUnit} from '../../../../geo-physics/domain/model/quantities/pressure-unit';
import {TemperatureUnit} from '../../../../geo-physics/domain/model/quantities/temperature-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';

@Component({
    selector: 'app-plan-perf-weather-factors',
    templateUrl: './plan-perf-weather-factors.component.html',
    styleUrls: ['./plan-perf-weather-factors.component.scss']
})
export class PlanPerfWeatherFactorsComponent implements OnInit {
    @Input() pressureUnit: PressureUnit;
    @Input() temperatureUnit: TemperatureUnit;
    @Input() altitudeUnit: LengthUnit;
    @Output() qnhChanged = new EventEmitter<Pressure>();
    @Output() oatChanged = new EventEmitter<Temperature>();

    protected weatherFactorsForm: FormGroup;


    constructor(private formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.initForm();
    }


    protected onQnhChanged() {
        if (this.weatherFactorsForm.controls['qnh'].valid) {
            const newQnh = new Pressure(this.weatherFactorsForm.value.qnh, this.pressureUnit);
            this.qnhChanged.emit(newQnh);
        }
    }


    protected onOatChanged() {
        if (this.weatherFactorsForm.controls['oat'].valid) {
            const newOat = new Temperature(this.weatherFactorsForm.value.oat, this.weatherFactorsForm.value.oatUnit);
            this.oatChanged.emit(newOat);
        }
    }


    private initForm() {
        // TODO: default values
        this.weatherFactorsForm = this.formBuilder.group({
            'qnh': [1013, [
                Validators.required,
                Validators.min(0),
            ]],
            'oat': [15, [
                Validators.required,
            ]],
        });
    }

    protected readonly Pressure = Pressure;
    protected readonly TemperatureUnit = TemperatureUnit;
    protected readonly Temperature = Temperature;
}
