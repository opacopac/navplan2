import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder, Validators} from '@angular/forms';
import {FlightMapActions} from '../../../../flight-map/state/ngrx/flight-map.actions';
import {FileUploadComponent} from '../../../../common/view/ng-components/file-upload/file-upload.component';
import {getIsUploading, getUploadedChartInfo} from '../../../state/ngrx/airport-chart.selectors';
import {AirportChartActions} from '../../../state/ngrx/airport-chart.actions';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-chart-upload-container',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatStepperModule,
        FileUploadComponent
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
