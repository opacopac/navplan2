import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MeteoLayer} from '../../../domain/model/meteo-layer';
import {getFlightMapMeteoLayer} from '../../../state/ngrx/flight-map.selectors';
import {ForecastRun} from '../../../../meteo-forecast/domain/model/forecast-run';
import {
    getMeteoForecastAvailableForecastRuns,
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
import {MatDialog} from '@angular/material/dialog';
import {
    MeteoForecastPickerDialogComponent
} from '../../../../meteo-forecast/view/ng-components/meteo-forecast-picker-dialog/meteo-forecast-picker-dialog.component';


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
    protected readonly availableFcRuns$: Observable<ForecastRun[]> = this.appStore.pipe(select(getMeteoForecastAvailableForecastRuns));
    protected readonly selectedFcRun$: Observable<ForecastRun> = this.appStore.pipe(select(getMeteoForecastForecastRun));
    protected readonly selectedStep$: Observable<number> = this.appStore.pipe(select(getMeteoForecastSelectedStep));


    constructor(
        private readonly appStore: Store<any>,
        private dialog: MatDialog
    ) {
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
        // this.appStore.dispatch(AircraftListActions.readList()); // TODO read available models

        const dialogRef = this.dialog.open(MeteoForecastPickerDialogComponent, {
            // height: '800px',
            // width: '600px',
            data: {
                forecastRunList$: this.availableFcRuns$,
                currentForecastRun$: this.selectedFcRun$
            }
        });

        dialogRef.afterClosed().subscribe((selectedFcRun) => {
            if (selectedFcRun) {
                this.appStore.dispatch(MeteoForecastActions.changeModel()); // TODO pass selected model
            }
        });
    }
}
