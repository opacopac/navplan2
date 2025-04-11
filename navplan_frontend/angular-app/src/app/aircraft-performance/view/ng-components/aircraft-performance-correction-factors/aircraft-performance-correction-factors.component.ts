import {Component, Input, OnInit} from '@angular/core';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {DistancePerformanceCorrectionFactors} from '../../../domain/model/distance-performance-correction-factors';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
    selector: 'app-aircraft-performance-correction-factors',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    templateUrl: './aircraft-performance-correction-factors.component.html',
    styleUrls: ['./aircraft-performance-correction-factors.component.scss']
})
export class AircraftPerformanceCorrectionFactorsComponent implements OnInit {
    @Input() correctionFactors: DistancePerformanceCorrectionFactors;
    @Input() speedUnit: SpeedUnit;

    protected readonly Speed = Speed;
    protected grassRwyCorrInput: FormControl;
    protected wetRwyCorrInput: FormControl;
    protected headwindCorrInput: FormControl;
    protected headwindPerSpeedInput: FormControl;
    protected tailwindCorrInput: FormControl;
    protected tailwindPerSpeedInput: FormControl;


    constructor() {
    }


    ngOnInit() {
        this.grassRwyCorrInput = new FormControl(this.correctionFactors.grassRwyIncPercent ?? 0, [
            Validators.required,
            Validators.min(0),
            Validators.max(999)
        ]);

        this.wetRwyCorrInput = new FormControl(this.correctionFactors.wetRwyIncPercent ?? 0, [
            Validators.required,
            Validators.min(0),
            Validators.max(999)
        ]);

        this.headwindCorrInput = new FormControl(this.correctionFactors.headwindDecPercent ?? 0, [
            Validators.required,
            Validators.min(0),
            Validators.max(999)
        ]);

        const headwindPerSpeedValue = this.correctionFactors.headwindDecPerSpeed
            ? StringnumberHelper.roundToDigits(this.correctionFactors.headwindDecPerSpeed.getValue(this.speedUnit), 0)
            : 1;
        this.headwindPerSpeedInput = new FormControl(headwindPerSpeedValue, [
            Validators.required,
            Validators.min(1),
            Validators.max(99)
        ]);

        this.tailwindCorrInput = new FormControl(this.correctionFactors.tailwindIncPercent ?? 0, [
            Validators.required,
            Validators.min(0),
            Validators.max(999)
        ]);

        const tailwindPerSpeedValue = this.correctionFactors.tailwindIncPerSpeed
            ? StringnumberHelper.roundToDigits(this.correctionFactors.tailwindIncPerSpeed.getValue(this.speedUnit), 0)
            : 1;
        this.tailwindPerSpeedInput = new FormControl(tailwindPerSpeedValue, [
            Validators.required,
            Validators.min(1),
            Validators.max(99)
        ]);
    }
}
