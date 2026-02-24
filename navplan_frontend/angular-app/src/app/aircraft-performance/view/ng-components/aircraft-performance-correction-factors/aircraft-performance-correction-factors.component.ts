import {Component, Input, OnInit} from '@angular/core';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {DistancePerformanceCorrectionFactors} from '../../../domain/model/distance-performance-correction-factors';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {HorizontalSpeedInputComponent} from '../../../../geo-physics/view/ng-components/horizontal-speed-input/horizontal-speed-input.component';


@Component({
    selector: 'app-aircraft-performance-correction-factors',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        HorizontalSpeedInputComponent,
    ],
    templateUrl: './aircraft-performance-correction-factors.component.html',
    styleUrls: ['./aircraft-performance-correction-factors.component.scss']
})
export class AircraftPerformanceCorrectionFactorsComponent implements OnInit {
    @Input() correctionFactors: DistancePerformanceCorrectionFactors;
    @Input() speedUnit: SpeedUnit;

    protected grassRwyCorrInput: FormControl;
    protected wetRwyCorrInput: FormControl;
    protected headwindCorrInput: FormControl;
    protected headwindPerSpeed: Speed | undefined;
    protected tailwindCorrInput: FormControl;
    protected tailwindPerSpeed: Speed | undefined;


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

        this.headwindPerSpeed = this.correctionFactors.headwindDecPerSpeed
            ?? new Speed(1, this.speedUnit);

        this.tailwindCorrInput = new FormControl(this.correctionFactors.tailwindIncPercent ?? 0, [
            Validators.required,
            Validators.min(0),
            Validators.max(999)
        ]);

        this.tailwindPerSpeed = this.correctionFactors.tailwindIncPerSpeed
            ?? new Speed(1, this.speedUnit);
    }


    protected onHeadwindPerSpeedChanged(speed: Speed): void {
        this.headwindPerSpeed = speed;
    }


    protected onTailwindPerSpeedChanged(speed: Speed): void {
        this.tailwindPerSpeed = speed;
    }
}
