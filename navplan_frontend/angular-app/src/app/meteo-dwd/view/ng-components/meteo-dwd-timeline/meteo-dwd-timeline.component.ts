import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {DatetimeHelper} from '../../../../system/domain/service/datetime/datetime-helper';
import {ForecastRun} from '../../../domain/model/forecast-run';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {MeteoDwdTimelineMarkingsComponent} from '../meteo-dwd-timeline-markings/meteo-dwd-timeline-markings.component';


@Component({
    selector: 'app-meteo-dwd-timeline',
    imports: [
        MatButtonModule,
        ReactiveFormsModule,
        MatSliderModule,
        MeteoDwdTimelineMarkingsComponent
    ],
    templateUrl: './meteo-dwd-timeline.component.html',
    styleUrls: ['./meteo-dwd-timeline.component.scss']
})
export class MeteoDwdTimelineComponent implements OnInit, OnChanges {
    @Input() currentForecastRun: ForecastRun;
    @Input() selectedStep: number;
    @Output() nextStepClicked = new EventEmitter<void>();
    @Output() previousStepClicked = new EventEmitter<void>();
    @Output() stepSelected = new EventEmitter<number>();

    protected meteoDwdTimelineForm: FormGroup;


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
        this.meteoDwdTimelineForm = this.formBuilder.group({
            'step': [this.selectedStep, []],
        });
    }
}
