import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder, Validators} from '@angular/forms';
import {FlightMapActions} from '../../../../flight-map/state/ngrx/flight-map.actions';
import {getIsUploading, getUploadedChartInfo} from '../../../state/ngrx/airport-chart.selectors';
import {AirportChartActions} from '../../../state/ngrx/airport-chart.actions';
import {CommonModule} from '@angular/common';
import {ChartUploadStep1Component} from '../chart-upload-step1/chart-upload-step1.component';


@Component({
    selector: 'app-chart-upload-container',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatStepperModule,
        ChartUploadStep1Component
    ],
    templateUrl: './chart-upload-container.component.html',
    styleUrls: ['./chart-upload-container.component.scss']
})
export class ChartUploadContainerComponent implements OnInit {
    protected uploadedChartInfo$ = this.appStore.select(getUploadedChartInfo);
    protected isUploading$ = this.appStore.select(getIsUploading);
    protected firstFormGroup = this.formBuilder.group({
        firstCtrl: ['', Validators.required],
    });
    protected secondFormGroup = this.formBuilder.group({
        secondCtrl: ['', Validators.required],
    });


    constructor(
        private appStore: Store<any>,
        private formBuilder: FormBuilder,
    ) {
    }


    ngOnInit() {
    }


    protected onCancelClicked() {
        this.appStore.dispatch(FlightMapActions.hideSidebar());
    }


    protected onFileUploaded(file: File) {
        this.appStore.dispatch(AirportChartActions.uploadAirportChart({file: file}));
    }
}
