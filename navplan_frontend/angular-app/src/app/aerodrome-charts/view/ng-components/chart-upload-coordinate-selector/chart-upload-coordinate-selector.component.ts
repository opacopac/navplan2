import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {GeoCoordinateType} from '../../../domain/model/geo-coordinate-type';
import {MatSelectModule} from '@angular/material/select';
import {GeoCoordinate} from '../../../../geo-physics/domain/model/geometry/geo-coordinate';
import {GenericGeoCoordinate} from '../../../../geo-physics/domain/model/geometry/generic-geo-coordinate';
import {Position2d} from '../../../../geo-physics/domain/model/geometry/position2d';


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
    @Input() isRequired: boolean;
    @Input() isDisabled: boolean;
    @Input() geoCoordinateType: GeoCoordinateType;
    @Input() coordinate: GeoCoordinate;
    @Output() coordinateChanged = new EventEmitter<GeoCoordinate>();

    protected formGroup: FormGroup;


    protected get coord1Control(): FormControl {
        return this.formGroup.get('coord1') as FormControl;
    }


    protected get coord2Control(): FormControl {
        return this.formGroup.get('coord2') as FormControl;
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
                    coordinate = new Position2d(coord2Value, coord1Value); // Latitude, Longitude
                    break;
                case GeoCoordinateType.LV03:
                case GeoCoordinateType.LV95:
                default:
                    coordinate = new GenericGeoCoordinate(this.geoCoordinateType, coord1Value, coord2Value); // East, North
                    break;
            }

            this.coordinateChanged.emit(coordinate);
        }
    }


    private initForm() {
        if (!this.formGroup) {
            return;
        }

        this.formGroup.addControl('coord1', new FormControl(
            this.getCoord1Value(),
            this.getValidators()
        ));

        this.formGroup.addControl('coord2', new FormControl(
            this.getCoord2Value(),
            this.getValidators()
        ));
    }


    private updateForm() {
        if (!this.formGroup) {
            return;
        }

        if (this.coordinate) {
            this.coord1Control?.setValue(this.getCoord1Value());
            this.coord2Control?.setValue(this.getCoord2Value());
        }

        if (this.isDisabled) {
            this.coord1Control?.disable();
            this.coord2Control?.disable();
        } else {
            this.coord1Control?.enable();
            this.coord2Control?.enable();
        }
    }


    private getValidators(): ValidatorFn[] {
        const validators: ValidatorFn[] = [];

        if (this.isRequired) {
            validators.push(Validators.required);
        }

        return validators;
    }


    private getCoord1Value(): string {
        if (!this.coordinate) {
            return '';
        }

        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                return this.coordinate.getN().toString();
            case GeoCoordinateType.LV03:
            case GeoCoordinateType.LV95:
            default:
                return this.coordinate.getE().toString();
        }
    }


    private getCoord2Value(): string {
        if (!this.coordinate) {
            return '';
        }

        switch (this.geoCoordinateType) {
            case GeoCoordinateType.LON_LAT:
                return this.coordinate.getE().toString();
            case GeoCoordinateType.LV03:
            case GeoCoordinateType.LV95:
            default:
                return this.coordinate.getN().toString();
        }
    }
}
