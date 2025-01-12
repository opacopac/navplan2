import {Component, Input, OnInit} from '@angular/core';
import {PlanPerfTakeoffCalculationState} from '../../../state/state-model/plan-perf-takeoff-calculation-state';
import {PlanPerfLandingCalculationState} from '../../../state/state-model/plan-perf-landing-calculation-state';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';

@Component({
    selector: 'app-plan-perf-calculation',
    templateUrl: './plan-perf-calculation.component.html',
    styleUrls: ['./plan-perf-calculation.component.scss']
})
export class PlanPerfCalculationComponent implements OnInit {
    @Input() takeoffPerformance: PlanPerfTakeoffCalculationState;
    @Input() landingPerformance: PlanPerfLandingCalculationState;
    @Input() performanceDistanceUnit: LengthUnit;


    constructor() {
    }


    ngOnInit() {
    }
}
