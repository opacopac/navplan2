import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-plan-perf-correction-factors',
    templateUrl: './plan-perf-correction-factors.component.html',
    styleUrls: ['./plan-perf-correction-factors.component.scss']
})
export class PlanPerfCorrectionFactorsComponent implements OnInit {
    @Output() grassRwyChanged = new EventEmitter<boolean>();
    @Output() wetRwyChanged = new EventEmitter<boolean>();
    @Output() rwySlopeChanged = new EventEmitter<number>();

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
        if (this.correctionFactorsForm.controls['rwySlope'].valid) {
            this.rwySlopeChanged.emit(this.correctionFactorsForm.value.rwySlope);
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
                Validators.min(-99),
                Validators.max(99)
            ]]
        });
    }
}
