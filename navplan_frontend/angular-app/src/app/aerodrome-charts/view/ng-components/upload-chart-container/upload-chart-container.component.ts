import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {MatButton} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder, Validators} from '@angular/forms';
import {FlightMapActions} from '../../../../flight-map/state/ngrx/flight-map.actions';


@Component({
    selector: 'app-upload-chart-container',
    standalone: true,
    imports: [
        MatButton,
        MatStepperModule
    ],
    templateUrl: './upload-chart-container.component.html',
    styleUrls: ['./upload-chart-container.component.scss']
})
export class UploadChartContainerComponent implements OnInit {
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
}
