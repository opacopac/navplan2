import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Position2d} from '../../../../geo-physics/domain/model/geometry/position2d';
import {select, Store} from '@ngrx/store';
import {getMeteoForecastForecastRun} from '../../../../meteo-forecast/state/ngrx/meteo-forecast.selectors';
import {Observable, Subscription} from 'rxjs';
import {CloudMeteogramSvg} from '../../svg/cloud-meteogram-svg';
import {CloudMeteogram} from '../../../domain/model/cloud-meteogram';
import {withLatestFrom} from 'rxjs/operators';
import {ForecastRun} from '../../../../meteo-forecast/domain/model/forecast-run';
import {MeteoGramActions} from '../../../state/ngrx/meteo-gram.actions';
import {getCloudMeteogram} from '../../../state/ngrx/meteo-gram.selectors';


@Component({
    selector: 'app-map-popup-meteogram',
    imports: [],
    templateUrl: './map-popup-meteogram.component.html',
    styleUrls: ['./map-popup-meteogram.component.scss']
})
export class MapPopupMeteogramComponent implements OnInit {
    @ViewChild('container') container: ElementRef;
    private readonly cloudMeteogram$: Observable<[CloudMeteogram, ForecastRun]> = this.appStore.pipe(
        select(getCloudMeteogram),
        withLatestFrom(this.appStore.pipe(select(getMeteoForecastForecastRun)))
    );
    private readonly meteogramStepsSubscription: Subscription;
    private currentMeteogram: [CloudMeteogram, ForecastRun];


    @Input() set position(pos: Position2d) {
        if (pos) {
            this.appStore.dispatch(MeteoGramActions.readCloudMeteogram({position: pos}));
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
