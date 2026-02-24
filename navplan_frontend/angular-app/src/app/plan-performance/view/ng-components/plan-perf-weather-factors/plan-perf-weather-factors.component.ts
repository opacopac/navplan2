import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Pressure} from '../../../../geo-physics/domain/model/quantities/pressure';
import {Temperature} from '../../../../geo-physics/domain/model/quantities/temperature';
import {PressureUnit} from '../../../../geo-physics/domain/model/quantities/pressure-unit';
import {TemperatureUnit} from '../../../../geo-physics/domain/model/quantities/temperature-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {PlanPerfWeatherFactorsState} from '../../../state/state-model/plan-perf-weather-factors-state';
import {PlanPerfWeatherCalculationState} from '../../../state/state-model/plan-perf-weather-calculation-state';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {AltitudeInputComponent} from '../../../../geo-physics/view/ng-components/altitude-input/altitude-input.component';
import {TemperatureInputComponent} from '../../../../geo-physics/view/ng-components/temperature-input/temperature-input.component';
import {AirPressureInputComponent} from '../../../../geo-physics/view/ng-components/air-pressure-input/air-pressure-input.component';

@Component({
    selector: 'app-plan-perf-weather-factors',
    imports: [
        ReactiveFormsModule,
        AltitudeInputComponent,
        TemperatureInputComponent,
        AirPressureInputComponent,
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
    protected elevation: Length | undefined;
    protected qnh: Pressure | undefined;
    protected oat: Temperature | undefined;


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


    protected onElevationChanged(elevation: Length) {
        this.elevation = elevation;
        this.weatherFactorsChanged.emit({...this.weatherFactors, elevation});
    }


    protected onQnhChanged(qnh: Pressure) {
        this.qnh = qnh;
        this.weatherFactorsChanged.emit({...this.weatherFactors, qnh});
    }


    protected onOatChanged(oat: Temperature) {
        this.oat = oat;
        this.weatherFactorsChanged.emit({...this.weatherFactors, oat});
    }


    private initForm() {
        this.elevation = this.weatherFactors.elevation;
        this.qnh = this.weatherFactors.qnh;
        this.oat = this.weatherFactors.oat;
        this.weatherFactorsForm = this.formBuilder.group({});
    }
}
