import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {MatButton} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder, Validators} from '@angular/forms';
import {FlightMapActions} from '../../../../flight-map/state/ngrx/flight-map.actions';
import {FileUploadComponent} from '../../../../common/view/ng-components/file-upload/file-upload.component';


@Component({
    selector: 'app-chart-upload-container',
    standalone: true,
    imports: [
        MatButton,
        MatStepperModule,
        FileUploadComponent
    ],
    templateUrl: './chart-upload-container.component.html',
    styleUrls: ['./chart-upload-container.component.scss']
})
export class ChartUploadContainerComponent implements OnInit {
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
