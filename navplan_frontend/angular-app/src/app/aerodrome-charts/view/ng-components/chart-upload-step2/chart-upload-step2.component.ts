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
import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {XyCoord} from '../../../../geo-physics/domain/model/geometry/xyCoord';
import {Airport} from '../../../../aerodrome/domain/model/airport';
import {MatRadioModule} from '@angular/material/radio';
import {ChartRegistrationType} from '../../../domain/model/chart-registration-type';
import {
    ChartUploadRegistrationTypeSelectorComponent
} from '../chart-upload-registration-type-selector/chart-upload-registration-type-selector.component';
import {
    IconButtonComponent
} from '../../../../common/view/ng-components/icon-button/icon-button.component';
import {
    ChartUploadPixelSelector
} from '../chart-upload-pixel-selector/chart-upload-pixel-selector.component';


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
        ReactiveFormsModule,
        MatRadioModule,
        ChartUploadRegistrationTypeSelectorComponent,
        IconButtonComponent,
        ChartUploadPixelSelector
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


    protected getOverlayIcons(): { id: number, icon: string, xyCoord: XyCoord, color: string }[] {
        const overlayIcons = [];

        if (this.selectedRefPoint1) {
            overlayIcons.push({
                id: 1,
                icon: 'fa-solid fa-crosshairs',
                xyCoord: this.selectedRefPoint1,
                color: 'dodgerblue'
            });
        }

        if (this.selectedRefPoint2) {
            overlayIcons.push({
                id: 2,
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


    protected onScaleChanged() {
        const scale = Number(this.scaleControl?.value);
        if (!isNaN(scale) && scale >= 0) {
            this.scaleChanged.emit(scale);
        }
    }


    protected onChartRefPoint1Changed(xyCoord: XyCoord) {
        this.reference1Selected.emit(xyCoord);
    }


    protected onChartRefPoint2Changed(xyCoord: XyCoord) {
        this.reference2Selected.emit(xyCoord);
    }


    private initForm() {
        if (!this.formGroup) {
            return;
        }

        this.formGroup.addControl('chartRegistrationType', new FormControl(
            this.chartRegistrationType,
            [Validators.required]
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

            if (this.scaleControl) {
                if (this.isPos1Pos2()) {
                    this.scaleControl.clearValidators();
                } else {
                    this.scaleControl.setValidators([Validators.required]);
                }

                this.scaleControl.updateValueAndValidity();
            }
        }

        if (this.chartScale) {
            this.scaleControl?.setValue(this.chartScale);
        }
    }
}
