import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {PlanPerfTakeoffCalculationState} from '../../../state/state-model/plan-perf-takeoff-calculation-state';
import {LengthUnit} from '../../../../../geo-physics/domain/model/quantities/length-unit';
import {PlanPerfChartSvg} from '../../svg/plan-perf-chart-svg';
import {PlanPerfLandingCalculationState} from '../../../state/state-model/plan-perf-landing-calculation-state';


@Component({
    selector: 'app-plan-perf-tkof-ldg-chart',
    templateUrl: './plan-perf-tkof-ldg-chart.component.html',
    styleUrls: ['./plan-perf-tkof-ldg-chart.component.scss']
})
export class PlanPerfTkofLdgChartComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() takeoffPerformance: PlanPerfTakeoffCalculationState;
    @Input() landingPerformance: PlanPerfLandingCalculationState;
    @Input() lengthUnit: LengthUnit;
    @ViewChild('container') container: ElementRef;


    constructor() {
    }


    ngOnInit(): void {
    }


    ngAfterViewInit(): void {
        this.redrawSvg();
    }


    ngOnChanges(): void {
        this.redrawSvg();
    }


    public redrawSvg() {
        if (!this.container) {
            return;
        }

        this.container.nativeElement.innerHTML = '';

        if (this.takeoffPerformance || this.landingPerformance) {
            const svg = PlanPerfChartSvg.create(
                this.takeoffPerformance,
                this.landingPerformance,
                this.lengthUnit,
                this.container.nativeElement.clientWidth,
                this.container.nativeElement.clientHeight,
            );

            this.container.nativeElement.appendChild(svg);
        }
    }
}
