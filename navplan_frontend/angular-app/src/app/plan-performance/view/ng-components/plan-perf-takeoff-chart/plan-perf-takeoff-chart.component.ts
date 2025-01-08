import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {PlanPerfTakeoffCalculationState} from '../../../state/state-model/plan-perf-takeoff-calculation-state';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {PlanPerfTakeoffChart} from '../../svg/plan-perf-takeoff-chart';


@Component({
    selector: 'app-plan-perf-takeoff-chart',
    templateUrl: './plan-perf-takeoff-chart.component.html',
    styleUrls: ['./plan-perf-takeoff-chart.component.scss']
})
export class PlanPerfTakeoffChartComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() takeoffPerformance: PlanPerfTakeoffCalculationState;
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

        if (this.takeoffPerformance) {
            const svg = PlanPerfTakeoffChart.create(
                this.takeoffPerformance,
                this.lengthUnit,
                this.container.nativeElement.clientWidth,
                this.container.nativeElement.clientHeight,
            );

            this.container.nativeElement.appendChild(svg);
        }
    }
}
