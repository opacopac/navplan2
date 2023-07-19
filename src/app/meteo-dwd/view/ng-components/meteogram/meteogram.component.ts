import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Position2d} from '../../../../geo-physics/domain/model/geometry/position2d';
import {select, Store} from '@ngrx/store';
import {MeteoDwdActions} from '../../../state/ngrx/meteo-dwd.actions';
import {getCloudMeteogram, getMeteoDwdForecastRun} from '../../../state/ngrx/meteo-dwd.selectors';
import {Observable, Subscription} from 'rxjs';
import {CloudMeteogramSvg} from '../../svg/cloud-meteogram-svg';
import {CloudMeteogram} from '../../../domain/model/cloud-meteogram';
import {withLatestFrom} from 'rxjs/operators';
import {ForecastRun} from '../../../domain/model/forecast-run';


@Component({
    selector: 'app-meteogram',
    templateUrl: './meteogram.component.html',
    styleUrls: ['./meteogram.component.css']
})
export class MeteogramComponent implements OnInit {
    @ViewChild('container') container: ElementRef;
    private readonly cloudMeteogram$: Observable<[CloudMeteogram, ForecastRun]> = this.appStore.pipe(
        select(getCloudMeteogram),
        withLatestFrom(this.appStore.pipe(select(getMeteoDwdForecastRun)))
    );
    private readonly meteogramStepsSubscription: Subscription;
    private currentMeteogram: [CloudMeteogram, ForecastRun];


    @Input() set position(pos: Position2d) {
        if (pos) {
            this.appStore.dispatch(MeteoDwdActions.readCloudMeteogram({position: pos}));
        }
    }


    constructor(private appStore: Store<any>) {
        this.meteogramStepsSubscription = this.cloudMeteogram$.subscribe(meteogramFcRun => this.onMeteogramChanged(meteogramFcRun));
    }


    ngOnInit(): void {
    }


    private onMeteogramChanged(meteogramFcRun: [CloudMeteogram, ForecastRun]): void {
        this.currentMeteogram = meteogramFcRun;

        if (this.container) {
            this.redrawSvg();
        }
    }


    public redrawSvg() {
        if (this.currentMeteogram) {
            const svg = CloudMeteogramSvg.create(
                this.currentMeteogram[0],
                this.currentMeteogram[1],
                this.container.nativeElement.clientWidth,
                this.container.nativeElement.clientHeight
            );

            this.container.nativeElement.innerHTML = svg.outerHTML;
        } else {
            this.container.nativeElement.innerHTML = '';
        }
    }
}
