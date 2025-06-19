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
    ValidatorFn,
    Validators
} from '@angular/forms';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {XyCoord} from '../../../../geo-physics/domain/model/geometry/xyCoord';
import {Airport} from '../../../../aerodrome/domain/model/airport';
import {ChartRegistrationType} from '../../../domain/model/chart-registration-type';
import {MatRadioModule} from '@angular/material/radio';
import {GeoCoordinateType} from '../../../domain/model/geo-coordinate-type';
import {MatSelectModule} from '@angular/material/select';
import {
    ChartUploadCoordinateSelector
} from '../chart-upload-coordinate-selector/chart-upload-coordinate-selector.component';
import {GeoCoordinate} from '../../../../geo-physics/domain/model/geometry/geo-coordinate';
import {
    ChartUploadRegistrationTypeSelectorComponent
} from '../chart-upload-registration-type-selector/chart-upload-registration-type-selector.component';


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
        MatRadioModule,
        MatSelectModule,
        ChartUploadCoordinateSelector,
        ChartUploadRegistrationTypeSelectorComponent
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
    @Input() geoCoordinateType: GeoCoordinateType;
    @Input() mapRefPoint1: GeoCoordinate;
    @Input() mapRefPoint2: GeoCoordinate;
    @Output() chartRegistrationTypeChanged = new EventEmitter<ChartRegistrationType>();
    @Output() geoCoordinateTypeChanged = new EventEmitter<GeoCoordinateType>();
    @Output() mapRefPoint1Selected = new EventEmitter<GeoCoordinate>();
    @Output() mapRefPoint2Selected = new EventEmitter<GeoCoordinate>();

    protected formGroup: FormGroup;
    protected readonly ButtonColor = ButtonColor;
    protected readonly ChartRegistrationType = ChartRegistrationType;
    protected readonly GeoCoordinateType = GeoCoordinateType;


    protected get chartRegistrationTypeControl(): FormControl {
        return this.formGroup.get('chartRegistrationType') as FormControl;
    }


    protected get geoCoordinateTypeControl(): FormControl {
        return this.formGroup.get('geoCoordinateType') as FormControl;
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

        if (this.chartRefPoint1) {
            overlayIcons.push({
                id: 1,
                icon: 'fa-solid fa-crosshairs',
                xyCoord: this.chartRefPoint1,
                color: 'dodgerblue'
            });
        }

        if (this.chartRefPoint2) {
            overlayIcons.push({
                id: 2,
                icon: 'fa-solid fa-crosshairs',
                xyCoord: this.chartRefPoint2,
                color: 'orange'
            });
        }

        return overlayIcons;
    }


    protected onChartRegistrationTypeChanged() {
        const chartRegistrationType = this.chartRegistrationTypeControl?.value;
        if (chartRegistrationType !== null) {
            this.chartRegistrationTypeChanged.emit(chartRegistrationType);
        }
    }


    protected onGeoCoordinateTypeChanged() {
        const geoCoordinateType = this.geoCoordinateTypeControl?.value;
        if (geoCoordinateType !== null) {
            this.geoCoordinateTypeChanged.emit(geoCoordinateType);
        }
    }


    protected onRefPoint1Changed(coord: GeoCoordinate) {
        this.mapRefPoint1Selected.emit(coord);
    }


    protected onRefPoint2Changed(coord: GeoCoordinate) {
        this.mapRefPoint2Selected.emit(coord);
    }


    protected isCoord2Required(): boolean {
        switch (this.chartRegistrationType) {
            case ChartRegistrationType.POS1_POS2:
                return true;
            case ChartRegistrationType.POS1_SCALE:
            case ChartRegistrationType.ARP_SCALE:
            default:
                return false;
        }
    }


    protected isCoord1Disabled(): boolean {
        return this.chartRegistrationType === ChartRegistrationType.ARP_SCALE;
    }


    private initForm() {
        if (!this.formGroup) {
            return;
        }

        this.formGroup.addControl('chartRegistrationType', new FormControl(
            this.chartRegistrationType,
            this.getChartRegistrationTypeValidators()
        ));
        this.formGroup.addControl('geoCoordinateType', new FormControl(
            this.geoCoordinateType,
            this.getGeoCoordinateTypeValidators()
        ));
    }


    private updateForm() {
        if (!this.formGroup) {
            return;
        }

        if (this.chartRegistrationType !== undefined) {
            this.chartRegistrationTypeControl?.setValue(this.chartRegistrationType);
        }

        if (this.geoCoordinateType !== undefined) {
            this.geoCoordinateTypeControl?.setValue(this.geoCoordinateType);
        }

        if (this.chartRegistrationType === ChartRegistrationType.ARP_SCALE) {
            this.geoCoordinateTypeControl?.disable();
        } else {
            this.geoCoordinateTypeControl?.enable();
        }

        // validators
        this.chartRegistrationTypeControl?.setValidators(this.getChartRegistrationTypeValidators());
        this.geoCoordinateTypeControl?.setValidators(this.getGeoCoordinateTypeValidators());

        this.chartRegistrationTypeControl?.updateValueAndValidity();
        this.chartRegistrationTypeControl?.updateValueAndValidity();
    }


    private getChartRegistrationTypeValidators(): ValidatorFn[] {
        switch (this.chartRegistrationType) {
            case ChartRegistrationType.POS1_POS2:
                return [];
            case ChartRegistrationType.POS1_SCALE:
            case ChartRegistrationType.ARP_SCALE:
            default:
                return [Validators.required];
        }
    }


    private getGeoCoordinateTypeValidators(): ValidatorFn[] {
        switch (this.chartRegistrationType) {
            case ChartRegistrationType.ARP_SCALE:
                return [];
            case ChartRegistrationType.POS1_SCALE:
            case ChartRegistrationType.POS1_POS2:
            default:
                return [Validators.required];
        }
    }


    private getRef1Validators(): ValidatorFn[] {
        switch (this.chartRegistrationType) {
            case ChartRegistrationType.ARP_SCALE:
                return [];
            case ChartRegistrationType.POS1_SCALE:
            case ChartRegistrationType.POS1_POS2:
            default:
                return [Validators.required];
        }
    }


    private getRef2Validators(): ValidatorFn[] {
        switch (this.chartRegistrationType) {
            case ChartRegistrationType.ARP_SCALE:
            case ChartRegistrationType.POS1_SCALE:
                return [];
            case ChartRegistrationType.POS1_POS2:
            default:
                return [Validators.required];
        }
    }
}
