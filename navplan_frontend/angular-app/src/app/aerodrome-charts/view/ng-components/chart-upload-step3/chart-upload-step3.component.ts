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
import {Position2d} from '../../../../geo-physics/domain/model/geometry/position2d';


@Component({
    selector: 'app-chart-upload-step3',
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
    templateUrl: './chart-upload-step3.component.html',
    styleUrls: ['./chart-upload-step3.component.scss']
})
export class ChartUploadStep3Component implements OnInit, OnChanges {
    @Input() uploadedChartInfo: UploadedChartInfo;
    @Input() chartRefPoint1: XyCoord;
    @Input() chartRefPoint2: XyCoord;
    @Input() mapRefPoint1: Position2d;
    @Input() mapRefPoint2: Position2d;
    @Output() mapRefPoint1Selected = new EventEmitter<Position2d>();
    @Output() mapRefPoint2Selected = new EventEmitter<Position2d>();

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


    protected getOverlayIcons(): { icon: string, xyCoord: XyCoord, color: string }[] {
        const overlayIcons = [];

        if (this.chartRefPoint1) {
            overlayIcons.push({
                icon: 'fa-solid fa-crosshairs',
                xyCoord: this.chartRefPoint1,
                color: 'dodgerblue'
            });
        }

        if (this.chartRefPoint2) {
            overlayIcons.push({
                icon: 'fa-solid fa-crosshairs',
                xyCoord: this.chartRefPoint2,
                color: 'orange'
            });
        }

        return overlayIcons;
    }


    protected onRefPoint1Changed() {
        const lat = this.formGroup.get('refLat1')?.value;
        const lon = this.formGroup.get('refLon1')?.value;

        if (lat && lon) {
            const coord = new Position2d(lon, lat);
            this.mapRefPoint1Selected.emit(coord);
        } else {
            this.mapRefPoint1Selected.emit(null);
        }
    }


    protected onRefPoint2Changed() {
        const lat = this.formGroup.get('refLat2')?.value;
        const lon = this.formGroup.get('refLon2')?.value;

        if (lat && lon) {
            const coord = new Position2d(lon, lat);
            this.mapRefPoint2Selected.emit(coord);
        } else {
            this.mapRefPoint2Selected.emit(null);
        }
    }


    private initForm() {
        if (!this.formGroup) {
            return;
        }

        this.formGroup.addControl('refLat1', new FormControl('', [Validators.required]));
        this.formGroup.addControl('refLon1', new FormControl('', [Validators.required]));
        this.formGroup.addControl('refLat2', new FormControl('', [Validators.required]));
        this.formGroup.addControl('refLon2', new FormControl('', [Validators.required]));
    }


    private updateForm() {
        if (!this.formGroup) {
            return;
        }

        if (this.mapRefPoint1) {
            this.formGroup.get('refLat1')?.setValue(this.mapRefPoint1.latitude);
            this.formGroup.get('refLon1')?.setValue(this.mapRefPoint1.longitude);
        }

        if (this.mapRefPoint2) {
            this.formGroup.get('refLat2')?.setValue(this.mapRefPoint2.latitude);
            this.formGroup.get('refLon2')?.setValue(this.mapRefPoint2.longitude);
        }
    }
}
