import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ForecastRun} from '../../../domain/model/forecast-run';
import {MeteoForecastTimelineMarkingsSvg} from '../../svg/meteo-forecast-timeline-markings-svg';


@Component({
    selector: 'app-meteo-forecast-timeline-markings',
    imports: [],
    templateUrl: './meteo-forecast-timeline-markings.component.html',
    styleUrls: ['./meteo-forecast-timeline-markings.component.scss']
})
export class MeteoForecastTimelineMarkingsComponent implements OnInit, AfterViewInit, OnChanges {
    @ViewChild('container') container: ElementRef;
    @Input() currentForecastRun: ForecastRun;


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

        if (this.currentForecastRun) {
            const svg = MeteoForecastTimelineMarkingsSvg.create(
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
