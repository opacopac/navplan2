import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {DatetimeHelper} from '../../../../system/domain/service/datetime/datetime-helper';
import {ForecastRun} from '../../../domain/model/forecast-run';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {
    MeteoForecastTimelineMarkingsComponent
} from '../meteo-forecast-timeline-markings/meteo-forecast-timeline-markings.component';


@Component({
    selector: 'app-meteo-forecast-timeline',
    imports: [
        MatButtonModule,
        ReactiveFormsModule,
        MatSliderModule,
        MeteoForecastTimelineMarkingsComponent
    ],
    templateUrl: './meteo-forecast-timeline.component.html',
    styleUrls: ['./meteo-forecast-timeline.component.scss']
})
export class MeteoForecastTimelineComponent implements OnInit, OnChanges {
    @Input() currentForecastRun: ForecastRun;
    @Input() selectedStep: number;
    @Output() nextStepClicked = new EventEmitter<void>();
    @Output() previousStepClicked = new EventEmitter<void>();
    @Output() stepSelected = new EventEmitter<number>();

    protected meteoFcTimelineForm: FormGroup;


    constructor(private formBuilder: FormBuilder) {
        this.formatLabel = this.formatLabel.bind(this);
    }


    ngOnInit(): void {
        this.initForm();
    }


    ngOnChanges(): void {
        this.initForm();
    }


    protected getMinStep(): number {
        return this.currentForecastRun?.model.minStep;
    }


    protected getMaxStep(): number {
        return this.currentForecastRun?.model.maxStep;
    }


    protected getStepInterval(): number {
        return this.currentForecastRun?.model.stepLength.hour;
    }


    protected formatLabel(step: number): string {
        if (!this.currentForecastRun) {
            return '';
        }

        const stepDateTime = this.currentForecastRun.getStepDateTime(step);
        const stepDateHour = stepDateTime.getHours();
        const stepDateWeekday = DatetimeHelper.getWeekdayShortFromDate(stepDateTime);

        return stepDateWeekday + ' ' + StringnumberHelper.zeroPad(stepDateHour, 2) + ':00 LT';
    }


    protected onPreviousStepClicked() {
        this.previousStepClicked.emit();
    }


    protected onNextStepClicked() {
        this.nextStepClicked.emit();
    }


    protected onStepSelected(value: number) {
        this.stepSelected.emit(value);
    }


    private initForm() {
        this.meteoFcTimelineForm = this.formBuilder.group({
            'step': [this.selectedStep, []],
        });
    }
}
