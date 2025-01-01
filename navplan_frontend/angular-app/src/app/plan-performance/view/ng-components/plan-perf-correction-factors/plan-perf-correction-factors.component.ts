import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';

@Component({
    selector: 'app-plan-perf-correction-factors',
    templateUrl: './plan-perf-correction-factors.component.html',
    styleUrls: ['./plan-perf-correction-factors.component.scss']
})
export class PlanPerfCorrectionFactorsComponent implements OnInit {
    @Input() windSpeedUnit: SpeedUnit;
    @Input() showWetRwy: boolean;
    @Output() grassRwyChanged = new EventEmitter<boolean>();
    @Output() wetRwyChanged = new EventEmitter<boolean>();
    @Output() rwySlopeChanged = new EventEmitter<number>();
    @Output() rwyWindChanged = new EventEmitter<Speed>();

    protected correctionFactorsForm: FormGroup;


    constructor(private formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.initForm();
    }


    protected onGrassRwyChanged() {
        if (this.correctionFactorsForm.controls['grassRwy'].valid) {
            this.grassRwyChanged.emit(this.correctionFactorsForm.value.grassRwy);
        }
    }

    protected onWetRwyChanged() {
        if (this.correctionFactorsForm.controls['wetRwy'].valid) {
            this.grassRwyChanged.emit(this.correctionFactorsForm.value.wetRwy);
        }
    }


    protected onRwySlopeChanged() {
        if (this.correctionFactorsForm.controls['rwySlope'].valid && this.correctionFactorsForm.controls['rwySlopeDir'].valid) {
            const rwySlopePercent = this.correctionFactorsForm.value.rwySlope * (this.correctionFactorsForm.value.rwySlopeDir ? 1 : -1);
            this.rwySlopeChanged.emit(rwySlopePercent);
        }
    }


    protected onRwyWindChanged() {
        if (this.correctionFactorsForm.controls['rwyWind'].valid && this.correctionFactorsForm.controls['rwyWindDir'].valid) {
            const rwyWindValue = this.correctionFactorsForm.value.rwyWind * (this.correctionFactorsForm.value.rwyWindDir ? 1 : -1);
            this.rwyWindChanged.emit(new Speed(rwyWindValue, this.windSpeedUnit));
        }
    }


    private initForm() {
        this.correctionFactorsForm = this.formBuilder.group({
            'grassRwy': [false, [
                Validators.required
            ]],
            'wetRwy': [false, [
                Validators.required
            ]],
            'rwySlope': [0, [
                Validators.required,
                Validators.min(0),
                Validators.max(99)
            ]],
            'rwySlopeDir': [true, [
                Validators.required
            ]],
            'rwyWind': [0, [
                Validators.required,
                Validators.min(0),
                Validators.max(999)
            ]],
            'rwyWindDir': [true, [
                Validators.required
            ]],
            'reserve': [0, [
                Validators.required,
                Validators.min(0),
                Validators.max(999)
            ]]
        });
    }
}
