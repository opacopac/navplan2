import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {UploadedChartInfo} from '../../../domain/model/uploaded-chart-info';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
    MiniImageViewerComponent
} from '../../../../common/view/ng-components/mini-image-viewer/mini-image-viewer.component';
import {FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {XyCoord} from '../../../../geo-physics/domain/model/geometry/xyCoord';


@Component({
    selector: 'app-chart-upload-step2',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MiniImageViewerComponent,
        ReactiveFormsModule
    ],
    templateUrl: './chart-upload-step2.component.html',
    styleUrls: ['./chart-upload-step2.component.scss']
})
export class ChartUploadStep2Component implements OnInit, OnChanges {
    @Input() uploadedChartInfo: UploadedChartInfo;
    @Input() selectedRefPoint1: XyCoord;
    @Input() selectedRefPoint2: XyCoord;
    @Output() reference1Selected = new EventEmitter<XyCoord>();
    @Output() reference2Selected = new EventEmitter<XyCoord>();

    protected formGroup: FormGroup;
    protected readonly ButtonColor = ButtonColor;


    constructor(private parentForm: FormGroupDirective) {
    }


    ngOnInit() {
        this.formGroup = this.parentForm.control;
        this.initForm();
    }


    ngOnChanges() {
        this.updateForm();
    }


    protected onImageClicked(coord: XyCoord) {
        coord.round(0);

        if (!this.selectedRefPoint1) {
            this.reference1Selected.emit(coord);
        } else if (!this.selectedRefPoint2) {
            this.reference2Selected.emit(coord);
        }
    }


    private initForm() {
        if (!this.formGroup) {
            return;
        }

        this.formGroup.addControl('refX1', new FormControl(
            '',
            [
                Validators.required,
            ]
        ));
        this.formGroup.addControl('refY1', new FormControl(
            '',
            [
                Validators.required,
            ]
        ));
        this.formGroup.addControl('refX2', new FormControl(
            '',
            [
                Validators.required,
            ]
        ));

        this.formGroup.addControl('refY2', new FormControl(
            '',
            [
                Validators.required,
            ]
        ));
    }


    private updateForm() {
        if (!this.formGroup) {
            return;
        }

        if (this.selectedRefPoint1) {
            this.formGroup.get('refX1')?.setValue(this.selectedRefPoint1.x);
            this.formGroup.get('refY1')?.setValue(this.selectedRefPoint1.y);
        }

        if (this.selectedRefPoint2) {
            this.formGroup.get('refX2')?.setValue(this.selectedRefPoint2.x);
            this.formGroup.get('refY2')?.setValue(this.selectedRefPoint2.y);
        }
    }


    protected onRefPoint1Changed() {
        const x = this.formGroup.get('refX1')?.value;
        const y = this.formGroup.get('refY1')?.value;

        if (x && y) {
            const coord = new XyCoord(x, y).round(0);
            this.reference1Selected.emit(coord);
        } else {
            this.reference1Selected.emit(null);
        }
    }


    protected onRefPoint2Changed() {
        const x = this.formGroup.get('refX2')?.value;
        const y = this.formGroup.get('refY2')?.value;

        if (x && y) {
            const coord = new XyCoord(x, y).round(0);
            this.reference2Selected.emit(coord);
        } else {
            this.reference2Selected.emit(null);
        }
    }
}
