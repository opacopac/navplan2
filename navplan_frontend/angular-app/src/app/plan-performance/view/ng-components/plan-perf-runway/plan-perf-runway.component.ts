import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../../aerodrome/domain/model/airport';

@Component({
    selector: 'app-plan-perf-runway',
    templateUrl: './plan-perf-runway.component.html',
    styleUrls: ['./plan-perf-runway.component.scss']
})
export class PlanPerfRunwayComponent implements OnInit {
    @Input() public airport: Airport;


    constructor() {
    }


    ngOnInit() {
    }


    protected onWetRwyChanged() {
        // TODO
    }


    protected onGrassRwyChanged() {
        // TODO
    }


    protected onRwySlopeChanged() {
        // TODO
    }
}
