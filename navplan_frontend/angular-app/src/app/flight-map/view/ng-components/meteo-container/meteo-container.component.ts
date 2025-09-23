import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MeteoLayer} from '../../../domain/model/meteo-layer';
import {getFlightMapMeteoLayer} from '../../../state/ngrx/flight-map.selectors';
import {ForecastRun} from '../../../../meteo-forecast/domain/model/forecast-run';
import {
    getMeteoForecastForecastRun,
    getMeteoForecastSelectedStep
} from '../../../../meteo-forecast/state/ngrx/meteo-forecast.selectors';
import {MeteoForecastActions} from '../../../../meteo-forecast/state/ngrx/meteo-forecast.actions';
import {
    MeteoForecastTimelineComponent
} from '../../../../meteo-forecast/view/ng-components/meteo-forecast-timeline/meteo-forecast-timeline.component';
import {CommonModule} from '@angular/common';
import {
    MeteoForecastModelInfoComponent
} from '../../../../meteo-forecast/view/ng-components/meteo-forecast-model-info/meteo-forecast-model-info.component';


@Component({
    selector: 'app-meteo-container',
    imports: [
        CommonModule,
        MeteoForecastTimelineComponent,
        MeteoForecastModelInfoComponent
    ],
    templateUrl: './meteo-container.component.html',
    styleUrls: ['./meteo-container.component.scss']
})
export class MeteoContainerComponent implements OnInit, OnDestroy, AfterViewInit {
    private readonly meteoLayer$ = this.appStore.pipe(select(getFlightMapMeteoLayer));
    protected readonly forecastRun$: Observable<ForecastRun> = this.appStore.pipe(select(getMeteoForecastForecastRun));
    protected readonly selectedStep$: Observable<number> = this.appStore.pipe(select(getMeteoForecastSelectedStep));


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
        this.appStore.dispatch(MeteoForecastActions.previousStep());
    }


    protected onNextStepClicked() {
        this.appStore.dispatch(MeteoForecastActions.nextStep());
    }


    protected onStepSelected(step: number) {
        this.appStore.dispatch(MeteoForecastActions.selectStep({step: step}));
    }


    protected onChangeModelClick() {
        this.appStore.dispatch(MeteoForecastActions.changeModel());
    }
}
