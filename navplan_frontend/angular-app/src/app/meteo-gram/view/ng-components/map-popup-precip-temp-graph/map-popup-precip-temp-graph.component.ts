import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Position2d} from '../../../../geo-physics/domain/model/geometry/position2d';
import {select, Store} from '@ngrx/store';
import {getMeteoDwdForecastRun} from '../../../../meteo-dwd/state/ngrx/meteo-dwd.selectors';
import {Observable, Subscription} from 'rxjs';
import {CloudMeteogram} from '../../../domain/model/cloud-meteogram';
import {withLatestFrom} from 'rxjs/operators';
import {ForecastRun} from '../../../../meteo-dwd/domain/model/forecast-run';
import {MeteoGramActions} from '../../../state/ngrx/meteo-gram.actions';
import {getCloudMeteogram} from '../../../state/ngrx/meteo-gram.selectors';
import {PrecipTempGraphSvg} from '../../svg/precip-temp-graph-svg';


@Component({
    selector: 'app-map-popup-precip-temp-graph',
    standalone: true,
    imports: [],
    templateUrl: './map-popup-precip-temp-graph.component.html',
    styleUrls: ['./map-popup-precip-temp-graph.component.scss']
})
export class MapPopupPrecipTempGraphComponent implements OnInit {
    @ViewChild('container') container: ElementRef;
    private readonly cloudMeteogram$: Observable<[CloudMeteogram, ForecastRun]> = this.appStore.pipe(
        select(getCloudMeteogram),
        withLatestFrom(this.appStore.pipe(select(getMeteoDwdForecastRun)))
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
            const svg = PrecipTempGraphSvg.create(
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
