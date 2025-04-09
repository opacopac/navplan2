import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ForecastRun} from '../../../domain/model/forecast-run';
import {MeteoDwdTimelineMarkingsSvg} from '../../svg/meteo-dwd-timeline-markings-svg';


@Component({
    selector: 'app-meteo-dwd-timeline-markings',
    standalone: true,
    imports: [],
    templateUrl: './meteo-dwd-timeline-markings.component.html',
    styleUrls: ['./meteo-dwd-timeline-markings.component.scss']
})
export class MeteoDwdTimelineMarkingsComponent implements OnInit, AfterViewInit, OnChanges {
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
