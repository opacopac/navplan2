import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';
import {Pressure} from '../../../../geo-physics/domain/model/quantities/pressure';
import {PlanPerfRwyFactorsState} from '../../../state/state-model/plan-perf-rwy-factors-state';

@Component({
    selector: 'app-plan-perf-runway-factors',
    templateUrl: './plan-perf-runway-factors.component.html',
    styleUrls: ['./plan-perf-runway-factors.component.scss']
})
export class PlanPerfRunwayFactorsComponent implements OnInit {
    @Input() runwayFactors: PlanPerfRwyFactorsState;
    @Input() speedUnit: SpeedUnit;
    @Input() showWetRwy: boolean;
    @Output() runwayFactorChanged = new EventEmitter<PlanPerfRwyFactorsState>();

    protected correctionFactorsForm: FormGroup;
    protected readonly Pressure = Pressure;
    protected readonly Speed = Speed;


    constructor(private formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.initForm();
    }


    protected onGrassRwyChanged() {
        if (this.correctionFactorsForm.controls['grassRwy'].valid) {
            this.runwayFactorChanged.emit({
                ...this.runwayFactors,
                isGrassRwy: this.correctionFactorsForm.value.grassRwy
            });
        }
    }

    protected onWetRwyChanged() {
        if (this.correctionFactorsForm.controls['wetRwy'].valid) {
            this.runwayFactorChanged.emit({
                ...this.runwayFactors,
                isWetRwy: this.correctionFactorsForm.value.wetRwy
            });
        }
    }


    protected onRwySlopeChanged() {
        if (this.correctionFactorsForm.controls['rwySlope'].valid && this.correctionFactorsForm.controls['rwySlopeDir'].valid) {
            const rwySlopePercent = this.correctionFactorsForm.value.rwySlope * (this.correctionFactorsForm.value.rwySlopeDir ? 1 : -1);
            this.runwayFactorChanged.emit({
                ...this.runwayFactors,
                rwySlopePercent: rwySlopePercent
            });
        }
    }


    protected onRwyWindChanged() {
        if (this.correctionFactorsForm.controls['rwyWind'].valid && this.correctionFactorsForm.controls['rwyWindDir'].valid) {
            const rwyWindValue = this.correctionFactorsForm.value.rwyWind * (this.correctionFactorsForm.value.rwyWindDir ? 1 : -1);
            this.runwayFactorChanged.emit({
                ...this.runwayFactors,
                rwyWind: new Speed(rwyWindValue, this.speedUnit)
            });
        }
    }


    protected onReserveChanged() {
        if (this.correctionFactorsForm.controls['reserve'].valid) {
            this.runwayFactorChanged.emit({
                ...this.runwayFactors,
                reservePercent: this.correctionFactorsForm.value.reserve
            });
        }
    }


    private initForm() {
        this.correctionFactorsForm = this.formBuilder.group({
            'grassRwy': [this.runwayFactors.isGrassRwy, [
                Validators.required
            ]],
            'wetRwy': [this.runwayFactors.isWetRwy, [
                Validators.required
            ]],
            'rwySlope': [Math.abs(this.runwayFactors.rwySlopePercent), [
                Validators.required,
                Validators.min(0),
                Validators.max(99)
            ]],
            'rwySlopeDir': [this.runwayFactors.rwySlopePercent >= 0, [
                Validators.required
            ]],
            'rwyWind': [this.runwayFactors.rwyWind.getValue(this.speedUnit), [
                Validators.required,
                Validators.min(0),
                Validators.max(999)
            ]],
            'rwyWindDir': [this.runwayFactors.rwyWind.getValue(this.speedUnit) >= 0, [
                Validators.required
            ]],
            'reserve': [this.runwayFactors.reservePercent, [
                Validators.required,
                Validators.min(0),
                Validators.max(999)
            ]]
        });
    }
}
