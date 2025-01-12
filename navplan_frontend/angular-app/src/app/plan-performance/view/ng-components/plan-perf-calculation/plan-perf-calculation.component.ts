import {Component, Input, OnInit} from '@angular/core';
import {PlanPerfTakeoffCalculationState} from '../../../state/state-model/plan-perf-takeoff-calculation-state';
import {PlanPerfLandingCalculationState} from '../../../state/state-model/plan-perf-landing-calculation-state';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {PlanPerfRwyFactorsState} from '../../../state/state-model/plan-perf-rwy-factors-state';

@Component({
    selector: 'app-plan-perf-calculation',
    templateUrl: './plan-perf-calculation.component.html',
    styleUrls: ['./plan-perf-calculation.component.scss']
})
export class PlanPerfCalculationComponent implements OnInit {
    @Input() takeoffPerformance: PlanPerfTakeoffCalculationState;
    @Input() landingPerformance: PlanPerfLandingCalculationState;
    @Input() rwyFactors: PlanPerfRwyFactorsState;
    @Input() performanceDistanceUnit: LengthUnit;


    constructor() {
    }


    ngOnInit() {
    }


    protected getLengthString(length: Length): string {
        return length ? length.getValueAndUnit(this.performanceDistanceUnit, 0) : '-';
    }
}
