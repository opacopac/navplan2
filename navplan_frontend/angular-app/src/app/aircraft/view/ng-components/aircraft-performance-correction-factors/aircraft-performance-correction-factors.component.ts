import {Component, Input, OnInit} from '@angular/core';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {DistancePerformanceCorrectionFactors} from '../../../domain/model/distance-performance-correction-factors';
import {FormControl} from '@angular/forms';


@Component({
    selector: 'app-aircraft-performance-correction-factors',
    templateUrl: './aircraft-performance-correction-factors.component.html',
    styleUrls: ['./aircraft-performance-correction-factors.component.scss']
})
export class AircraftPerformanceCorrectionFactorsComponent implements OnInit {
    @Input() correctionFactors: DistancePerformanceCorrectionFactors;
    @Input() speedUnit: SpeedUnit;

    protected grassRwyCorrInput: FormControl;
    protected wetRwyCorrInput: FormControl;
    protected headwindCorrInput: FormControl;
    protected tailwindCorrInput: FormControl;


    constructor() {
    }


    ngOnInit() {
    }
}
