import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FlightMapActions} from '../../../../flight-map/state/ngrx/flight-map.actions';
import {
    getIsUploading,
    getPdfParameters,
    getSelectedChartFile,
    getUploadedChartInfo
} from '../../../state/ngrx/airport-chart.selectors';
import {AirportChartActions} from '../../../state/ngrx/airport-chart.actions';
import {CommonModule} from '@angular/common';
import {ChartUploadStep1Component} from '../chart-upload-step1/chart-upload-step1.component';
import {ChartUploadParameters} from '../../../domain/model/chart-upload-parameters';


@Component({
    selector: 'app-chart-upload-container',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatStepperModule,
        ChartUploadStep1Component,
    ],
    templateUrl: './chart-upload-container.component.html',
    styleUrls: ['./chart-upload-container.component.scss']
})
export class ChartUploadContainerComponent implements OnInit {
    public step1FormGroup: FormGroup;
    public step2FormGroup: FormGroup;

    protected selectedFile$ = this.appStore.select(getSelectedChartFile);
    protected pdfParameters$ = this.appStore.select(getPdfParameters);
    protected uploadedChartInfo$ = this.appStore.select(getUploadedChartInfo);
    protected isUploading$ = this.appStore.select(getIsUploading);


    constructor(
        private appStore: Store<any>,
        private formBuilder: FormBuilder,
    ) {
    }


    ngOnInit() {
        this.step1FormGroup = this.formBuilder.group({});
        this.step2FormGroup = this.formBuilder.group({});
    }


    protected onCancelClicked() {
        this.appStore.dispatch(FlightMapActions.hideSidebar());
    }


    protected onFileSelected(file: File) {
        this.appStore.dispatch(
            AirportChartActions.chartFileSelected({file: file})
        );
    }


    protected onFileUploaded(chartUploadParameters: ChartUploadParameters) {
        this.appStore.dispatch(
            AirportChartActions.uploadAirportChart({chartUploadParameters: chartUploadParameters})
        );
    }
}
