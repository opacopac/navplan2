import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    ReactiveFormsModule,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {GeoCoordinateType} from '../../../domain/model/geo-coordinate-type';
import {MatSelectModule} from '@angular/material/select';
import {GeoCoordinate} from '../../../../geo-physics/domain/model/geometry/geo-coordinate';
import {
    SwissTopoService
} from '../../../../geo-physics/domain/service/swisstopo/swiss-topo-service';


@Component({
    selector: 'app-chart-upload-coordinate-selector',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule
    ],
    templateUrl: './chart-upload-coordinate-selector.component.html',
    styleUrls: ['./chart-upload-coordinate-selector.component.scss']
})
export class ChartUploadCoordinateSelector implements OnInit, OnChanges {
    protected static readonly FORM_CONTROL_NAME_COORD1 = 'coord1';
    protected static readonly FORM_CONTROL_NAME_COORD2 = 'coord2';
    protected static readonly WGS84_PRECISION = 6;
    protected static readonly LV03_LV95_PRECISION = 0;
    protected static readonly WGS84_MIN_LEN = 1;
    protected static readonly WGS84_MAX_LEN = 11;
    protected static readonly LV03_MIN_LEN_E = 6;
    protected static readonly LV03_MIN_LEN_N = 5;
    protected static readonly LV03_MAX_LEN_E_N = 6;
    protected static readonly LV95_MIN_MAX_LEN = 7;

    @Input() controlName: string;
    @Input() isRequired: boolean;
    @Input() isDisabled: boolean;
    @Input() geoCoordinateType: GeoCoordinateType;
    @Input() coordinate: GeoCoordinate;
    @Output() coordinateChanged = new EventEmitter<GeoCoordinate>();

    public formGroup: FormGroup;


    protected get coord1ControlName(): string {
        return this.controlName + '_' + ChartUploadCoordinateSelector.FORM_CONTROL_NAME_COORD1;
    }


    protected get coord2ControlName(): string {
        return this.controlName + '_' + ChartUploadCoordinateSelector.FORM_CONTROL_NAME_COORD2;
    }


    protected get coord1Control(): FormControl {
        return this.formGroup.get(this.coord1ControlName) as FormControl;
    }


    protected get coord2Control(): FormControl {
        return this.formGroup.get(this.coord2ControlName) as FormControl;
    }


    constructor(
        private parentForm: FormGroupDirective
    ) {
    }


    ngOnInit() {
        this.formGroup = this.parentForm.control;
        this.initForm();
    }


    ngOnChanges() {
        this.updateForm();
    }


    protected getCoord1Name(): string {
        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                return 'Latitude';
            case GeoCoordinateType.LV03:
            case GeoCoordinateType.LV95:
            default:
                return 'East';
        }
    }


    protected getCoord2Name(): string {
        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                return 'Longitude';
            case GeoCoordinateType.LV03:
            case GeoCoordinateType.LV95:
            default:
                return 'North';
        }
    }


    protected getCoord1Suffix(): string {
        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                return '° N';
            case GeoCoordinateType.LV03:
            case GeoCoordinateType.LV95:
                return 'm E';
            default:
                return '';
        }
    }


    protected getCoord2Suffix(): string {
        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                return '° E';
            case GeoCoordinateType.LV03:
            case GeoCoordinateType.LV95:
                return 'm N';
            default:
                return '';
        }
    }


    protected getCoord1MinValue(): number {
        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                return -90;
            case GeoCoordinateType.LV03:
                return SwissTopoService.LV03_MIN_E;
            case GeoCoordinateType.LV95:
                return SwissTopoService.LV95_MIN_E;
        }
    }


    protected getCoord1MaxValue(): number {
        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                return 90;
            case GeoCoordinateType.LV03:
                return SwissTopoService.LV03_MAX_E;
            case GeoCoordinateType.LV95:
                return SwissTopoService.LV95_MAX_E;
        }
    }


    protected getCoord2MinValue(): number {
        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                return -180;
            case GeoCoordinateType.LV03:
                return SwissTopoService.LV03_MIN_N;
            case GeoCoordinateType.LV95:
                return SwissTopoService.LV95_MIN_N;
        }
    }


    protected getCoord2MaxValue(): number {
        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                return 180;
            case GeoCoordinateType.LV03:
                return SwissTopoService.LV03_MAX_N;
            case GeoCoordinateType.LV95:
                return SwissTopoService.LV95_MAX_N;
        }
    }


    protected getCoord1MinLength(): number {
        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                return ChartUploadCoordinateSelector.WGS84_MIN_LEN;
            case GeoCoordinateType.LV03:
                return ChartUploadCoordinateSelector.LV03_MIN_LEN_E;
            case GeoCoordinateType.LV95:
                return ChartUploadCoordinateSelector.LV95_MIN_MAX_LEN;
        }
    }


    protected getCoord1MaxLength(): number {
        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                return ChartUploadCoordinateSelector.WGS84_MAX_LEN;
            case GeoCoordinateType.LV03:
                return ChartUploadCoordinateSelector.LV03_MAX_LEN_E_N;
            case GeoCoordinateType.LV95:
                return ChartUploadCoordinateSelector.LV95_MIN_MAX_LEN;
        }
    }


    protected getCoord2MinLength(): number {
        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                return ChartUploadCoordinateSelector.WGS84_MIN_LEN;
            case GeoCoordinateType.LV03:
                return ChartUploadCoordinateSelector.LV03_MIN_LEN_N;
            case GeoCoordinateType.LV95:
                return ChartUploadCoordinateSelector.LV95_MIN_MAX_LEN;
        }
    }


    protected getCoord2MaxLength(): number {
        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                return ChartUploadCoordinateSelector.WGS84_MAX_LEN;
            case GeoCoordinateType.LV03:
                return ChartUploadCoordinateSelector.LV03_MAX_LEN_E_N;
            case GeoCoordinateType.LV95:
                return ChartUploadCoordinateSelector.LV95_MIN_MAX_LEN;
        }
    }


    protected onCoordChanged() {
        if (!this.formGroup) {
            return;
        }

        const coord1Str = this.coord1Control?.value;
        const coord2Str = this.coord2Control?.value;

        if (coord1Str && coord2Str) {
            const coord1Value = parseFloat(coord1Str);
            const coord2Value = parseFloat(coord2Str);

            let coordinate: GeoCoordinate;
            switch (this.geoCoordinateType) {
                case GeoCoordinateType.LON_LAT:
                    coordinate = new GeoCoordinate(this.geoCoordinateType, coord2Value, coord1Value); // Longitude, Latitude
                    break;
                case GeoCoordinateType.LV03:
                case GeoCoordinateType.LV95:
                default:
                    coordinate = new GeoCoordinate(this.geoCoordinateType, coord1Value, coord2Value); // East, North
                    break;
            }

            this.coordinateChanged.emit(coordinate);
        }
    }


    private initForm() {
        if (!this.formGroup) {
            return;
        }

        this.formGroup.addControl(this.coord1ControlName, new FormControl(
            this.getCoord1Value(),
            this.getCoord1Validators()
        ));

        this.formGroup.addControl(this.coord2ControlName, new FormControl(
            this.getCoord2Value(),
            this.getCoord2Validators()
        ));
    }


    private updateForm() {
        if (!this.formGroup) {
            return;
        }

        // values
        this.coord1Control?.setValue(this.getCoord1Value());
        this.coord2Control?.setValue(this.getCoord2Value());

        // disabled state
        if (this.isDisabled) {
            this.coord1Control?.disable();
            this.coord2Control?.disable();
        } else {
            this.coord1Control?.enable();
            this.coord2Control?.enable();
        }

        // validators
        this.coord1Control?.setValidators(this.getCoord1Validators());
        this.coord2Control?.setValidators(this.getCoord2Validators());

        this.coord1Control?.updateValueAndValidity();
        this.coord2Control?.updateValueAndValidity();

    }


    private getCoord1Validators(): ValidatorFn[] {
        const validators: ValidatorFn[] = [];

        if (this.isRequired) {
            validators.push(Validators.required);
        }

        validators.push(Validators.min(this.getCoord1MinValue()));
        validators.push(Validators.max(this.getCoord1MaxValue()));
        validators.push(Validators.minLength(this.getCoord1MinLength()));
        validators.push(Validators.maxLength(this.getCoord1MaxLength()));

        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                validators.push(Validators.pattern(/^-?(\d){1,2}(\.\d+)?$/));
                break;
            case GeoCoordinateType.LV03:
            case GeoCoordinateType.LV95:
                validators.push(Validators.pattern(/^\d+$/));
                break;
        }

        return validators;
    }


    private getCoord2Validators(): ValidatorFn[] {
        const validators: ValidatorFn[] = [];

        if (this.isRequired) {
            validators.push(Validators.required);
        }

        validators.push(Validators.min(this.getCoord2MinValue()));
        validators.push(Validators.max(this.getCoord2MaxValue()));
        validators.push(Validators.minLength(this.getCoord2MinLength()));
        validators.push(Validators.maxLength(this.getCoord2MaxLength()));

        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                validators.push(Validators.pattern(/^-?(\d){1,3}(\.\d+)?$/));
                break;
            case GeoCoordinateType.LV03:
            case GeoCoordinateType.LV95:
                validators.push(Validators.pattern(/^\d+$/));
                break;
        }

        return validators;
    }


    private getCoord1Value(): string {
        if (!this.coordinate) {
            return '';
        }

        const coord = this.coordinate.toType(this.geoCoordinateType);

        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                return coord.getN(ChartUploadCoordinateSelector.WGS84_PRECISION).toString();
            case GeoCoordinateType.LV03:
            case GeoCoordinateType.LV95:
            default:
                return coord.getE(ChartUploadCoordinateSelector.LV03_LV95_PRECISION).toString();
        }
    }


    private getCoord2Value(): string {
        if (!this.coordinate) {
            return '';
        }

        const coord = this.coordinate.toType(this.geoCoordinateType);

        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                return coord.getE(ChartUploadCoordinateSelector.WGS84_PRECISION).toString();
            case GeoCoordinateType.LV03:
            case GeoCoordinateType.LV95:
            default:
                return coord.getN(ChartUploadCoordinateSelector.LV03_LV95_PRECISION).toString();
        }
    }
}
