import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FlightMapActions} from '../../../../flight-map/state/ngrx/flight-map.actions';
import {
    getChartReference1,
    getChartReference2,
    getIsUploading,
    getMapReference1,
    getMapReference2,
    getPdfParameters, getSelectedAirport,
    getSelectedChartFile,
    getUploadedChartInfo
} from '../../../state/ngrx/airport-chart.selectors';
import {AirportChartActions} from '../../../state/ngrx/airport-chart.actions';
import {CommonModule} from '@angular/common';
import {ChartUploadStep1Component} from '../chart-upload-step1/chart-upload-step1.component';
import {ChartUploadParameters} from '../../../domain/model/chart-upload-parameters';
import {ChartUploadStep2Component} from '../chart-upload-step2/chart-upload-step2.component';
import {XyCoord} from '../../../../geo-physics/domain/model/geometry/xyCoord';
import {ChartUploadStep3Component} from '../chart-upload-step3/chart-upload-step3.component';
import {Position2d} from '../../../../geo-physics/domain/model/geometry/position2d';


@Component({
    selector: 'app-chart-upload-container',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatStepperModule,
        ChartUploadStep1Component,
        ChartUploadStep2Component,
        ChartUploadStep3Component,
    ],
    templateUrl: './chart-upload-container.component.html',
    styleUrls: ['./chart-upload-container.component.scss']
})
export class ChartUploadContainerComponent implements OnInit {
    public step1FormGroup: FormGroup;
    public step2FormGroup: FormGroup;
    public step3FormGroup: FormGroup;

    protected selectedFile$ = this.appStore.select(getSelectedChartFile);
    protected pdfParameters$ = this.appStore.select(getPdfParameters);
    protected selectedAirport$ = this.appStore.select(getSelectedAirport);
    protected uploadedChartInfo$ = this.appStore.select(getUploadedChartInfo);
    protected chartReference1$ = this.appStore.select(getChartReference1);
    protected chartReference2$ = this.appStore.select(getChartReference2);
    protected mapReference1$ = this.appStore.select(getMapReference1);
    protected mapReference2$ = this.appStore.select(getMapReference2);
    protected isUploading$ = this.appStore.select(getIsUploading);


    constructor(
        private appStore: Store<any>,
        private formBuilder: FormBuilder,
    ) {
    }


    ngOnInit() {
        this.step1FormGroup = this.formBuilder.group({});
        this.step2FormGroup = this.formBuilder.group({});
        this.step3FormGroup = this.formBuilder.group({});
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


    protected onChartReference1Selected(coordinates: XyCoord) {
        this.appStore.dispatch(
            AirportChartActions.chartReference1Changed({chartReference1: coordinates})
        );
    }


    protected onChartReference2Selected(coordinates: XyCoord) {
        this.appStore.dispatch(
            AirportChartActions.chartReference2Changed({chartReference2: coordinates})
        );
    }


    protected onMapReference1Selected(pos: Position2d) {
        this.appStore.dispatch(
            AirportChartActions.mapReference1Changed({mapReference1: pos})
        );
    }


    protected onMapReference2Selected(pos: Position2d) {
        this.appStore.dispatch(
            AirportChartActions.mapReference2Changed({mapReference2: pos})
        );
    }

    protected onCancelClicked() {
        this.appStore.dispatch(FlightMapActions.hideSidebar());
    }


    protected onSaveClicked() {
        /*this.appStore.dispatch([
            AirportChartActions.saveAirportChart({ chartSaveParameters: undefined }), // TODO
            FlightMapActions.hideSidebar()
        ]);*/
    }
}
