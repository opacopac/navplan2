import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {getMeteoDwdForecastRun, getMeteoDwdSelectedStep} from '../../../state/ngrx/meteo-dwd.selectors';
import {MeteoDwdActions} from '../../../state/ngrx/meteo-dwd.actions';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {MatSlider, MatSliderChange} from '@angular/material/slider';
import {DatetimeHelper} from '../../../../system/domain/service/datetime/datetime-helper';
import {ForecastRun} from '../../../domain/model/forecast-run';
import {filter, map} from 'rxjs/operators';


@Component({
    selector: 'app-meteo-dwd-timeline',
    templateUrl: './meteo-dwd-timeline.component.html',
    styleUrls: ['./meteo-dwd-timeline.component.scss']
})
export class MeteoDwdTimelineComponent implements OnInit, OnDestroy {
    @ViewChild('container') container: ElementRef;
    @ViewChild('slider') slider: MatSlider;
    private readonly forecastRun$: Observable<ForecastRun> = this.appStore.pipe(select(getMeteoDwdForecastRun));
    private readonly selectedStep$: Observable<number> = this.appStore.pipe(select(getMeteoDwdSelectedStep));
    private readonly forecastRunSubscription: Subscription;
    private readonly selectedStepSubscription: Subscription;
    private currentForecastRun: ForecastRun = undefined;


    constructor(
        private appStore: Store<any>
    ) {
        this.formatLabel = this.formatLabel.bind(this);

        this.forecastRunSubscription = this.forecastRun$.subscribe(forecastRun => this.updateForecastRun(forecastRun));
        this.selectedStepSubscription = this.selectedStep$.subscribe(selectedStep => this.updateSelectedStep(selectedStep));
    }


    ngOnInit(): void {
    }


    ngOnDestroy(): void {
        this.forecastRunSubscription.unsubscribe();
    }


    public getMinStep(): Observable<number> {
        return this.forecastRun$.pipe(
            filter(run => run !== undefined),
            map(run => run.model.minStep)
        );
    }


    public getMaxStep(): Observable<number> {
        return this.forecastRun$.pipe(
            filter(run => run !== undefined),
            map(run => run.model.maxStep)
        );
    }


    public getStepInterval(): Observable<number> {
        return this.forecastRun$.pipe(
            filter(run => run !== undefined),
            map(run => run.model.stepLength.hour)
        );
    }


    public formatLabel(step: number): string {
        if (!this.currentForecastRun) {
            return '';
        }

        const stepOffsetMs = step * this.currentForecastRun.model.stepLength.ms;
        const stepDate = new Date(this.currentForecastRun.startTime.valueOf() + stepOffsetMs);
        const stepDateHour = stepDate.getHours();
        const stepDateWeekday = DatetimeHelper.getWeekdayShortFromDate(stepDate);

        return stepDateWeekday + ' ' + StringnumberHelper.zeroPad(stepDateHour, 2) + ':00 LT';
    }


    public onPreviousStepClicked() {
        this.appStore.dispatch(
            MeteoDwdActions.previousStep()
        );
    }


    public onNextStepClicked() {
        this.appStore.dispatch(
            MeteoDwdActions.nextStep()
        );
    }


    public onIntervalSelected(event: MatSliderChange) {
        this.appStore.dispatch(
            MeteoDwdActions.selectStep({step: event.value})
        );
    }


    private updateForecastRun(forecastRun: ForecastRun) {
        this.currentForecastRun = forecastRun;
    }


    private updateSelectedStep(selectedStep: number) {
        if (this.slider && this.slider.step !== selectedStep) {
            this.slider.step = selectedStep;
        }
    }
}
