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
import {Airport} from '../../../../aerodrome/domain/model/airport';
import {MatRadioModule} from '@angular/material/radio';
import {ChartRegistrationType} from '../../../domain/model/chart-registration-type';


@Component({
    selector: 'app-chart-upload-step2',
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MiniImageViewerComponent,
        ReactiveFormsModule,
        MatRadioModule
    ],
    templateUrl: './chart-upload-step2.component.html',
    styleUrls: ['./chart-upload-step2.component.scss']
})
export class ChartUploadStep2Component implements OnInit, OnChanges {
    @Input() selectedAirport: Airport;
    @Input() uploadedChartInfo: UploadedChartInfo;
    @Input() chartRegistrationType: ChartRegistrationType;
    @Input() selectedRefPoint1: XyCoord;
    @Input() selectedRefPoint2: XyCoord;
    @Input() chartScale: number;
    @Output() chartRegistrationTypeChanged = new EventEmitter<ChartRegistrationType>();
    @Output() reference1Selected = new EventEmitter<XyCoord>();
    @Output() reference2Selected = new EventEmitter<XyCoord>();
    @Output() scaleChanged = new EventEmitter<number>();

    protected formGroup: FormGroup;
    protected readonly ButtonColor = ButtonColor;
    protected readonly ChartRegistrationType = ChartRegistrationType;


    protected get refX1Control(): FormControl {
        return this.formGroup.get('refX1') as FormControl;
    }


    protected get refY1Control(): FormControl {
        return this.formGroup.get('refY1') as FormControl;
    }


    protected get refX2Control(): FormControl {
        return this.formGroup.get('refX2') as FormControl;
    }


    protected get refY2Control(): FormControl {
        return this.formGroup.get('refY2') as FormControl;
    }


    protected get scaleControl(): FormControl {
        return this.formGroup.get('scale') as FormControl;
    }


    protected get chartRegistrationTypeControl(): FormControl {
        return this.formGroup.get('chartRegistrationType') as FormControl;
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

        if (this.selectedRefPoint1) {
            overlayIcons.push({
                icon: 'fa-solid fa-crosshairs',
                xyCoord: this.selectedRefPoint1,
                color: 'dodgerblue'
            });
        }

        if (this.selectedRefPoint2) {
            overlayIcons.push({
                icon: 'fa-solid fa-crosshairs',
                xyCoord: this.selectedRefPoint2,
                color: 'orange'
            });
        }

        return overlayIcons;
    }


    protected isPos1Pos2(): boolean {
        return this.chartRegistrationType === ChartRegistrationType.POS1_POS2;
    }


    protected onChartRegistrationTypeChanged() {
        const chartRegistrationType = this.chartRegistrationTypeControl?.value;
        if (chartRegistrationType !== null) {
            this.chartRegistrationTypeChanged.emit(chartRegistrationType);
        }
    }


    protected onImageClicked(coord: XyCoord) {
        coord.round(0);

        if (!this.selectedRefPoint1) {
            this.reference1Selected.emit(coord);
        } else if (this.chartRegistrationType === ChartRegistrationType.POS1_POS2 && !this.selectedRefPoint2) {
            this.reference2Selected.emit(coord);
        }
    }


    protected onRefPoint1Changed() {
        const x = this.refX1Control?.value;
        const y = this.refY1Control?.value;

        if (x && y) {
            const coord = new XyCoord(x, y).round(0);
            this.reference1Selected.emit(coord);
        } else {
            this.reference1Selected.emit(null);
        }
    }


    protected onRefPoint2Changed() {
        const x = this.refX2Control?.value;
        const y = this.refY2Control?.value;

        if (x && y) {
            const coord = new XyCoord(x, y).round(0);
            this.reference2Selected.emit(coord);
        } else {
            this.reference2Selected.emit(null);
        }
    }


    protected onScaleChanged() {
        const scale = Number(this.scaleControl?.value);
        if (!isNaN(scale) && scale >= 0) {
            this.scaleChanged.emit(scale);
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
        this.formGroup.addControl('refX1', new FormControl(
            this.selectedRefPoint1?.x,
            [Validators.required]
        ));
        this.formGroup.addControl('refY1', new FormControl(
            this.selectedRefPoint1?.y,
            [Validators.required])
        );
        this.formGroup.addControl('refX2', new FormControl(
            this.selectedRefPoint2?.x,
            this.isPos1Pos2() ? [Validators.required] : []
        ));
        this.formGroup.addControl('refY2', new FormControl(
            this.selectedRefPoint2?.y,
            this.isPos1Pos2() ? [Validators.required] : []
        ));
        this.formGroup.addControl('scale', new FormControl(
            this.chartScale,
            this.isPos1Pos2() ? [] : [Validators.required]
        ));
    }


    private updateForm() {
        if (!this.formGroup) {
            return;
        }

        if (this.chartRegistrationType !== undefined) {
            this.chartRegistrationTypeControl?.setValue(this.chartRegistrationType);

            if (this.refX2Control && this.refY2Control && this.scaleControl) {
                if (this.isPos1Pos2()) {
                    this.refX2Control.setValidators([Validators.required]);
                    this.refY2Control.setValidators([Validators.required]);
                    this.scaleControl.clearValidators();
                } else {
                    this.refX2Control.clearValidators();
                    this.refY2Control.clearValidators();
                    this.scaleControl.setValidators([Validators.required]);
                }

                this.refX2Control.updateValueAndValidity();
                this.refY2Control.updateValueAndValidity();
                this.scaleControl.updateValueAndValidity();
            }
        }

        if (this.selectedRefPoint1) {
            this.refX1Control?.setValue(this.selectedRefPoint1.x);
            this.refY1Control?.setValue(this.selectedRefPoint1.y);
        }

        if (this.selectedRefPoint2) {
            this.refX2Control?.setValue(this.selectedRefPoint2.x);
            this.refY2Control?.setValue(this.selectedRefPoint2.y);
        }

        if (this.chartScale) {
            this.scaleControl?.setValue(this.chartScale);
        }
    }

}
