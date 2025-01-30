import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ForecastRun} from '../../../domain/model/forecast-run';
import {MeteoDwdTimelineMarkingsSvg} from '../../svg/meteo-dwd-timeline-markings-svg';


@Component({
    selector: 'app-meteo-dwd-timeline-markings',
    templateUrl: './meteo-dwd-timeline-markings.component.html',
    styleUrls: ['./meteo-dwd-timeline-markings.component.scss']
})
export class MeteoDwdTimelineMarkingsComponent implements OnInit {
    @ViewChild('container') container: ElementRef;
    @Input() currentForecastRun: ForecastRun;


    constructor() {
    }


    ngOnInit(): void {
    }


    public redrawSvg() {
        if (this.currentForecastRun) {
            const svg = MeteoDwdTimelineMarkingsSvg.create(
                this.currentForecastRun,
                this.container.nativeElement.clientWidth,
                this.container.nativeElement.clientHeight
            );

            this.container.nativeElement.innerHTML = svg.outerHTML;
        } else {
            this.container.nativeElement.innerHTML = '';
        }
    }
}
