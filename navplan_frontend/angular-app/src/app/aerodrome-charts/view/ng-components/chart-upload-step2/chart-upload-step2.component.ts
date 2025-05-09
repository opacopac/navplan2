import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {UploadedChartInfo} from '../../../domain/model/uploaded-chart-info';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MiniImageViewerComponent} from '../../../../common/view/ng-components/mini-image-viewer/mini-image-viewer.component';
import {FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {XyCoord} from '../../../../geo-physics/domain/model/geometry/xyCoord';
import {Airport} from '../../../../aerodrome/domain/model/airport';
import {MatRadioModule} from '@angular/material/radio';
import {ChartRegistrationType} from '../../../domain/model/chart-registration-type';


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
        const chartRegistrationType = this.formGroup.get('chartRegistrationType')?.value;
        if (chartRegistrationType) {
            this.chartRegistrationTypeChanged.emit(chartRegistrationType);
        }
    }


    protected onImageClicked(coord: XyCoord) {
        coord.round(0);

        if (!this.selectedRefPoint1) {
            this.reference1Selected.emit(coord);
        } else if (!this.selectedRefPoint2) {
            this.reference2Selected.emit(coord);
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


    protected onScaleChanged() {
        const scale = this.formGroup.get('scale')?.value;
        if (scale) {
            this.scaleChanged.emit(scale);
        }
    }


    private initForm() {
        if (!this.formGroup) {
            return;
        }

        this.formGroup.addControl('chartRegistrationType', new FormControl(this.chartRegistrationType, [Validators.required]));
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

        if (this.chartRegistrationType) {
            this.formGroup.get('chartRegistrationType')?.setValue(this.chartRegistrationType);
            this.formGroup.get('refX2')?.setValidators(this.isPos1Pos2() ? [Validators.required] : []);
            this.formGroup.get('refY2')?.setValidators(this.isPos1Pos2() ? [Validators.required] : []);
            this.formGroup.get('scale')?.setValidators(this.isPos1Pos2() ? [] : [Validators.required]);
        }

        if (this.selectedRefPoint1) {
            this.formGroup.get('refX1')?.setValue(this.selectedRefPoint1.x);
            this.formGroup.get('refY1')?.setValue(this.selectedRefPoint1.y);
        }

        if (this.selectedRefPoint2) {
            this.formGroup.get('refX2')?.setValue(this.selectedRefPoint2.x);
            this.formGroup.get('refY2')?.setValue(this.selectedRefPoint2.y);
        }

        if (this.chartScale) {
            this.formGroup.get('scale')?.setValue(this.chartScale);
        }
    }
}
