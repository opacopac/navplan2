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
import {Airport} from '../../../../aerodrome/domain/model/airport';
import {ChartRegistrationType} from '../../../domain/model/chart-registration-type';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';


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
        ReactiveFormsModule,
        MatRadioButton,
        MatRadioGroup
    ],
    templateUrl: './chart-upload-step3.component.html',
    styleUrls: ['./chart-upload-step3.component.scss']
})
export class ChartUploadStep3Component implements OnInit, OnChanges {
    @Input() selectedAirport: Airport;
    @Input() uploadedChartInfo: UploadedChartInfo;
    @Input() chartRegistrationType: ChartRegistrationType;
    @Input() chartRefPoint1: XyCoord;
    @Input() chartRefPoint2: XyCoord;
    @Input() mapRefPoint1: Position2d;
    @Input() mapRefPoint2: Position2d;
    @Output() chartRegistrationTypeChanged = new EventEmitter<ChartRegistrationType>();
    @Output() mapRefPoint1Selected = new EventEmitter<Position2d>();
    @Output() mapRefPoint2Selected = new EventEmitter<Position2d>();

    protected formGroup: FormGroup;
    protected readonly ButtonColor = ButtonColor;
    protected readonly ChartRegistrationType = ChartRegistrationType;


    protected get chartRegistrationTypeControl(): FormControl {
        return this.formGroup.get('chartRegistrationType') as FormControl;
    }


    protected get refLat1Control(): FormControl {
        return this.formGroup.get('refLat1') as FormControl;
    }


    protected get refLon1Control(): FormControl {
        return this.formGroup.get('refLon1') as FormControl;
    }


    protected get refLat2Control(): FormControl {
        return this.formGroup.get('refLat2') as FormControl;
    }


    protected get refLon2Control(): FormControl {
        return this.formGroup.get('refLon2') as FormControl;
    }


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


    protected isPos1Pos2(): boolean {
        return this.chartRegistrationType === ChartRegistrationType.POS1_POS2;
    }


    protected isPos1Scale(): boolean {
        return this.chartRegistrationType === ChartRegistrationType.POS1_SCALE;
    }


    protected onChartRegistrationTypeChanged() {
        const chartRegistrationType = this.chartRegistrationTypeControl?.value;
        if (chartRegistrationType !== null) {
            this.chartRegistrationTypeChanged.emit(chartRegistrationType);
        }
    }


    protected onRefPoint1Changed() {
        const lat = this.refLat1Control?.value;
        const lon = this.refLon1Control?.value;

        if (lat && lon) {
            const coord = new Position2d(lon, lat);
            this.mapRefPoint1Selected.emit(coord);
        } else {
            this.mapRefPoint1Selected.emit(null);
        }
    }


    protected onRefPoint2Changed() {
        const lat = this.refLat2Control?.value;
        const lon = this.refLon2Control?.value;

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

        this.formGroup.addControl('chartRegistrationType', new FormControl(
            this.chartRegistrationType,
            [Validators.required]
        ));
        this.formGroup.addControl('refLat1', new FormControl(
            this.mapRefPoint1 ? this.mapRefPoint1.latitude : '',
            this.isPos1Pos2() || this.isPos1Scale ? [Validators.required] : []
        ));
        this.formGroup.addControl('refLon1', new FormControl(
            this.mapRefPoint1 ? this.mapRefPoint1.longitude : '',
            this.isPos1Pos2() || this.isPos1Scale ? [Validators.required] : []
        ));
        this.formGroup.addControl('refLat2', new FormControl(
            this.mapRefPoint2 ? this.mapRefPoint2.latitude : '',
            this.isPos1Pos2() ? [Validators.required] : []
        ));
        this.formGroup.addControl('refLon2', new FormControl(
            this.mapRefPoint2 ? this.mapRefPoint2.longitude : '',
            this.isPos1Pos2() ? [Validators.required] : []
        ));
    }


    private updateForm() {
        if (!this.formGroup) {
            return;
        }

        if (this.chartRegistrationType !== undefined) {
            this.chartRegistrationTypeControl?.setValue(this.chartRegistrationType);

            if (this.refLat1Control && this.refLon1Control && this.refLat2Control && this.refLon2Control) {
                if (this.isPos1Pos2()) {
                    this.refLat1Control.setValidators([Validators.required]);
                    this.refLon1Control.setValidators([Validators.required]);
                    this.refLat2Control.setValidators([Validators.required]);
                    this.refLon2Control.setValidators([Validators.required]);
                } else if (this.isPos1Scale()) {
                    this.refLat1Control.setValidators([Validators.required]);
                    this.refLon1Control.setValidators([Validators.required]);
                    this.refLat2Control.clearValidators();
                    this.refLon2Control.clearValidators();
                } else {
                    this.refLat1Control.clearValidators();
                    this.refLon1Control.clearValidators();
                    this.refLat2Control.clearValidators();
                    this.refLon2Control.clearValidators();
                }

                this.refLat1Control.updateValueAndValidity();
                this.refLon1Control.updateValueAndValidity();
                this.refLat2Control.updateValueAndValidity();
                this.refLon2Control.updateValueAndValidity();
            }
        }

        if (this.mapRefPoint1) {
            this.refLat1Control?.setValue(this.mapRefPoint1.latitude);
            this.refLon1Control?.setValue(this.mapRefPoint1.longitude);
        }

        if (this.mapRefPoint2) {
            this.refLat2Control?.setValue(this.mapRefPoint2.latitude);
            this.refLon2Control?.setValue(this.mapRefPoint2.longitude);
        }
    }
}
