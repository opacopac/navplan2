import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {DatetimeHelper} from '../../../../system/domain/service/datetime/datetime-helper';
import {RadarImage} from '../../../domain/model/radar-image';


@Component({
    selector: 'app-meteo-radar-timeline',
    imports: [
        MatButtonModule,
        ReactiveFormsModule,
        MatSliderModule
    ],
    templateUrl: './meteo-radar-timeline.component.html',
    styleUrls: ['./meteo-radar-timeline.component.scss']
})
export class MeteoRadarTimelineComponent implements OnInit, OnChanges {
    @Input() availableRadarImages: RadarImage[] = [];
    @Input() selectedRadarImage: RadarImage;
    @Output() previousStepClicked = new EventEmitter<void>();
    @Output() nextStepClicked = new EventEmitter<void>();
    @Output() stepSelected = new EventEmitter<RadarImage>();

    protected meteoRadarTimelineForm: FormGroup;


    constructor(private formBuilder: FormBuilder) {
        this.formatLabel = this.formatLabel.bind(this);
    }


    ngOnInit(): void {
        this.initForm();
    }


    ngOnChanges(): void {
        this.initForm();
    }


    protected getMinIndex(): number {
        return 0;
    }


    protected getMaxIndex(): number {
        return Math.max(this.availableRadarImages.length - 1, 0);
    }


    protected getSelectedIndex(): number {
        const index = this.availableRadarImages.indexOf(this.selectedRadarImage);
        return index >= 0 ? index : this.getMaxIndex();
    }


    protected formatLabel(index: number): string {
        const image = this.availableRadarImages[index];
        if (!image) {
            return '';
        }

        const weekday = DatetimeHelper.getWeekdayShortFromDate(image.endTime);
        const hour = StringnumberHelper.zeroPad(image.endTime.getHours(), 2);
        const minute = StringnumberHelper.zeroPad(image.endTime.getMinutes(), 2);

        return weekday + ' ' + hour + ':' + minute + ' LT';
    }


    protected onPreviousStepClicked() {
        this.previousStepClicked.emit();
    }


    protected onNextStepClicked() {
        this.nextStepClicked.emit();
    }


    protected onIndexSelected(index: number) {
        const image = this.availableRadarImages[index];
        if (image) {
            this.stepSelected.emit(image);
        }
    }


    private initForm() {
        this.meteoRadarTimelineForm = this.formBuilder.group({
            'step': [this.getSelectedIndex(), []],
        });
    }
}

