import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';
import {Pressure} from '../../../../geo-physics/domain/model/quantities/pressure';
import {PlanPerfRwyFactorsState} from '../../../state/state-model/plan-perf-rwy-factors-state';
import {AirportRunway} from '../../../../aerodrome/domain/model/airport-runway';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {HorizontalSpeedInputComponent} from '../../../../geo-physics/view/ng-components/horizontal-speed-input/horizontal-speed-input.component';

@Component({
    selector: 'app-plan-perf-runway-factors',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        MatInputModule,
        MatOptionModule,
        HorizontalSpeedInputComponent,
    ],
    templateUrl: './plan-perf-runway-factors.component.html',
    styleUrls: ['./plan-perf-runway-factors.component.scss']
})
export class PlanPerfRunwayFactorsComponent implements OnInit, OnChanges {
    @Input() runways: AirportRunway[];
    @Input() runwayFactors: PlanPerfRwyFactorsState;
    @Input() speedUnit: SpeedUnit;
    @Input() rwyDistUnit: LengthUnit;
    @Input() isLanding: boolean;
    @Output() runwayFactorChanged = new EventEmitter<PlanPerfRwyFactorsState>();

    protected correctionFactorsForm: FormGroup;
    protected readonly Pressure = Pressure;
    protected readonly Length = Length;
    protected rwyWindSpeed: Speed | undefined;


    constructor(private formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.initForm();
    }


    ngOnChanges() {
        if (this.correctionFactorsForm && this.correctionFactorsForm.controls['touchdown']) {
            if (this.runwayFactors.use50ftAboveThreshold) {
                this.correctionFactorsForm.controls['touchdown'].disable();
            } else {
                this.correctionFactorsForm.controls['touchdown'].enable();
            }
        }
    }


    protected getRwyText(rwy: AirportRunway): string {
        let rwyName = rwy.name;
        if (rwy.surface && rwy.surface.length > 0) {
            rwyName += ' (' + rwy.surface + ')';
        }

        return rwyName;
    }


    protected onRunwayChanged() {
        if (this.correctionFactorsForm.controls['runway'].valid) {
            const rwy = this.correctionFactorsForm.value.runway as AirportRunway;
            this.runwayFactorChanged.emit({
                ...this.runwayFactors,
                runway: rwy,
                isGrassRwy: rwy.isGrass()
            });

            this.correctionFactorsForm.patchValue({grassRwy: rwy.isGrass()});
        }
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


    protected onRwyWindSpeedChanged(speed: Speed) {
        this.rwyWindSpeed = speed;
        this.emitRwyWind();
    }


    protected onRwyWindDirChanged() {
        this.emitRwyWind();
    }


    private emitRwyWind() {
        if (this.rwyWindSpeed != null && this.correctionFactorsForm.controls['rwyWindDir'].valid) {
            const isHeadwind: boolean = this.correctionFactorsForm.value.rwyWindDir;
            const signedValue = this.rwyWindSpeed.getValue(this.rwyWindSpeed.unit) * (isHeadwind ? 1 : -1);
            this.runwayFactorChanged.emit({
                ...this.runwayFactors,
                rwyWind: new Speed(signedValue, this.rwyWindSpeed.unit)
            });
        }
    }


    protected onTouchdownChanged() {
        if (this.correctionFactorsForm.controls['touchdown'].valid) {
            this.runwayFactorChanged.emit({
                ...this.runwayFactors,
                touchdownAfterThr: new Length(this.correctionFactorsForm.value.touchdown, this.rwyDistUnit)
            });
        }
    }


    protected onUse50FtAboveThresholdChanged() {
        if (this.correctionFactorsForm.controls['use50ftAboveThreshold'].valid) {
            this.runwayFactorChanged.emit({
                ...this.runwayFactors,
                use50ftAboveThreshold: this.correctionFactorsForm.value.use50ftAboveThreshold
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
        this.rwyWindSpeed = new Speed(Math.abs(this.runwayFactors.rwyWind.getValue(this.speedUnit)), this.speedUnit);
        this.correctionFactorsForm = this.formBuilder.group({
            'runway': [this.runwayFactors.runway, [
                Validators.required,
            ]],
            'grassRwy': [this.runwayFactors.isGrassRwy, []],
            'wetRwy': [this.runwayFactors.isWetRwy, []],
            'rwyWindDir': [this.runwayFactors.rwyWind.getValue(this.speedUnit) >= 0, [
                Validators.required
            ]],
            'touchdown': [this.runwayFactors.touchdownAfterThr.getValue(this.rwyDistUnit), [
                Validators.required,
                Validators.min(0),
            ]],
            'use50ftAboveThreshold': [this.runwayFactors.use50ftAboveThreshold, []],
            'reserve': [this.runwayFactors.reservePercent, [
                Validators.required,
                Validators.min(0),
                Validators.max(999)
            ]]
        });
    }
}
