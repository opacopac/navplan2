import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MeteoLayer} from '../../../domain/model/meteo-layer';
import {getFlightMapMeteoLayer} from '../../../state/ngrx/flight-map.selectors';
import {ForecastRun} from '../../../../meteo-dwd/domain/model/forecast-run';
import {getMeteoDwdForecastRun, getMeteoDwdSelectedStep} from '../../../../meteo-dwd/state/ngrx/meteo-dwd.selectors';
import {MeteoDwdActions} from '../../../../meteo-dwd/state/ngrx/meteo-dwd.actions';
import {
    MeteoDwdTimelineComponent
} from '../../../../meteo-dwd/view/ng-components/meteo-dwd-timeline/meteo-dwd-timeline.component';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-meteo-container',
    standalone: true,
    imports: [
        CommonModule,
        MeteoDwdTimelineComponent
    ],
    templateUrl: './meteo-container.component.html',
    styleUrls: ['./meteo-container.component.scss']
})
export class MeteoContainerComponent implements OnInit, OnDestroy, AfterViewInit {
    private readonly meteoLayer$ = this.appStore.pipe(select(getFlightMapMeteoLayer));
    protected readonly forecastRun$: Observable<ForecastRun> = this.appStore.pipe(select(getMeteoDwdForecastRun));
    protected readonly selectedStep$: Observable<number> = this.appStore.pipe(select(getMeteoDwdSelectedStep));


    constructor(private readonly appStore: Store<any>) {
    }


    ngOnInit(): void {
    }


    ngAfterViewInit(): void {
    }


    ngOnDestroy(): void {
    }


    protected getTimeLineClass(): Observable<string> {
        return this.meteoLayer$.pipe(
            map(layer => layer === MeteoLayer.SmaStationsLayer ? 'timeline-hide' : 'timeline-show')
        );
    }


    protected onPreviousStepClicked() {
        this.appStore.dispatch(MeteoDwdActions.previousStep());
    }


    protected onNextStepClicked() {
        this.appStore.dispatch(MeteoDwdActions.nextStep());
    }


    protected onStepSelected(step: number) {
        this.appStore.dispatch(MeteoDwdActions.selectStep({step: step}));
    }
}
