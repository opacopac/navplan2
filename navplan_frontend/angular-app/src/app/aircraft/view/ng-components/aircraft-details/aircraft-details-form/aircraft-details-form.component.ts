import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Aircraft} from '../../../../domain/model/aircraft';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Consumption} from '../../../../../geo-physics/domain/model/quantities/consumption';
import {Speed} from '../../../../../geo-physics/domain/model/quantities/speed';
import {SpeedUnit} from '../../../../../geo-physics/domain/model/quantities/speed-unit';
import {ConsumptionUnit} from '../../../../../geo-physics/domain/model/quantities/consumption-unit';
import {Length} from '../../../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../../../geo-physics/domain/model/quantities/length-unit';
import {VehicleType} from '../../../../domain/model/vehicle-type';
import {FuelType} from '../../../../domain/model/fuel-type';
import {StringnumberHelper} from '../../../../../system/domain/service/stringnumber/stringnumber-helper';
import {
    AircraftTypeDesignatorAutocompleteComponent
} from '../aircraft-type-designator-autocomplete/aircraft-type-designator-autocomplete.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {SaveButtonComponent} from '../../../../../common/view/ng-components/save-button/save-button.component';
import {MatSelectModule} from '@angular/material/select';


@Component({
    selector: 'app-aircraft-details-form',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatRadioModule,
        MatInputModule,
        MatSelectModule,
        SaveButtonComponent,
        AircraftTypeDesignatorAutocompleteComponent,
    ],
    templateUrl: './aircraft-details-form.component.html',
    styleUrls: ['./aircraft-details-form.component.scss']
})
export class AircraftDetailsFormComponent implements OnInit, OnChanges {
    @Input() currentAircraft: Aircraft;
    @Input() speedUnit: SpeedUnit;
    @Input() consumptionUnit: ConsumptionUnit;
    @Output() vehicleTypeChanged = new EventEmitter<VehicleType>();
    @Output() registrationChanged = new EventEmitter<string>();
    @Output() icaoTypeChanged = new EventEmitter<string>();
    @Output() cruiseSpeedChanged = new EventEmitter<Speed>();
    @Output() cruiseFuelChanged = new EventEmitter<Consumption>();
    @Output() fuelTypeChanged = new EventEmitter<FuelType>();
    @Output() rocSealevelChanged = new EventEmitter<Speed>();
    @Output() serviceCeilingChanged = new EventEmitter<Length>();
    @Output() cruiseClimbSpeedChanged = new EventEmitter<Speed>();
    @Output() saveAircraftClicked = new EventEmitter<void>();

    protected readonly VehicleType = VehicleType;
    protected readonly FuelType = FuelType;
    protected readonly Speed = Speed;
    protected readonly Length = Length;
    protected readonly Consumption = Consumption;
    protected readonly SpeedUnit = SpeedUnit;
    protected readonly LengthUnit = LengthUnit;
    protected aircraftDetailsForm: FormGroup;
    protected isIcaoTypeValid: boolean;


    constructor(private formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.initForm();
    }


    ngOnChanges() {
        this.initForm();
    }


    protected getInitialIcaoType() {
        return this.currentAircraft ? this.currentAircraft.icaoType : '';
    }


    protected onVehicleTypeChanged() {
        if (this.aircraftDetailsForm.controls['vehicleType'].valid) {
            this.vehicleTypeChanged.emit(this.aircraftDetailsForm.value.vehicleType);
        }
    }


    protected onRegistrationChanged() {
        if (this.aircraftDetailsForm.controls['registration'].valid) {
            this.registrationChanged.emit(this.aircraftDetailsForm.value.registration);
        }
    }


    protected onIcaoTypeChanged(icaoType: string) {
        this.icaoTypeChanged.emit(icaoType);
    }


    protected onCruiseSpeedChanged() {
        if (this.aircraftDetailsForm.controls['cruiseSpeed'].valid) {
            const speed = new Speed(this.aircraftDetailsForm.value.cruiseSpeed, this.speedUnit);
            this.cruiseSpeedChanged.emit(speed);
        }
    }


    protected onCruiseFuelChanged() {
        if (this.aircraftDetailsForm.controls['cruiseFuel'].valid) {
            const fuel = new Consumption(this.aircraftDetailsForm.value.cruiseFuel, this.consumptionUnit);
            this.cruiseFuelChanged.emit(fuel);
        }
    }


    protected onFuelTypeChanged() {
        if (this.aircraftDetailsForm.controls['fuelType'].valid) {
            if (this.aircraftDetailsForm.value.fuelType === '') {
                this.fuelTypeChanged.emit(null);
            } else {
                this.fuelTypeChanged.emit(this.aircraftDetailsForm.value.fuelType);
            }
        }
    }


    protected onRocSealevelChanged() {
        if (this.aircraftDetailsForm.controls['rocSealevel'].valid) {
            const speed = new Speed(this.aircraftDetailsForm.value.rocSealevel, SpeedUnit.FPM);
            this.rocSealevelChanged.emit(speed);
        }
    }


    protected onServiceCeilingChanged() {
        if (this.aircraftDetailsForm.controls['serviceCeiling'].valid) {
            const length = new Length(this.aircraftDetailsForm.value.serviceCeiling, LengthUnit.FT);
            this.serviceCeilingChanged.emit(length);
        }
    }


    protected onCruiseClimbSpeedChanged() {
        if (this.aircraftDetailsForm.controls['cruiseClimbSpeed'].valid) {
            const speed = new Speed(this.aircraftDetailsForm.value.cruiseClimbSpeed, SpeedUnit.FPM);
            this.cruiseClimbSpeedChanged.emit(speed);
        }
    }


    protected isFormValid(): boolean {
        return this.aircraftDetailsForm.valid && this.isIcaoTypeValid;
    }


    protected onSaveAircraftDetailsClicked() {
        if (this.isFormValid()) {
            this.saveAircraftClicked.emit();
        }
    }


    private initForm() {
        if (!this.currentAircraft) {
            return;
        }

        this.aircraftDetailsForm = this.formBuilder.group({
            'vehicleType': [this.currentAircraft.vehicleType, [
                Validators.required
            ]],
            'registration': [this.currentAircraft.registration, [
                Validators.required
            ]],
            'cruiseSpeed': [this.currentAircraft.cruiseSpeed
                ? StringnumberHelper.roundToDigits(this.currentAircraft.cruiseSpeed.getValue(this.speedUnit), 0).toString()
                : '',
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(999)
                ]
            ],
            'cruiseFuel': [this.currentAircraft.cruiseFuel
                ? StringnumberHelper.roundToDigits(this.currentAircraft.cruiseFuel.getValue(this.consumptionUnit), 0).toString()
                : '',
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(999)
                ]
            ],
            'fuelType': [this.currentAircraft.fuelType ?? '', [
                Validators.required
            ]],
            'rocSealevel': [this.currentAircraft.rocSealevel
                ? StringnumberHelper.roundToDigits(this.currentAircraft.rocSealevel.getValue(SpeedUnit.FPM), 0).toString()
                : '',
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(9999)
                ]
            ],
            'serviceCeiling': [this.currentAircraft.serviceCeiling
                ? StringnumberHelper.roundToDigits(this.currentAircraft.serviceCeiling.getValue(LengthUnit.FT), 0).toString()
                : '',
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(99999)
                ]
            ],
            'cruiseClimbSpeed': [this.currentAircraft.cruiseClimbSpeed
                ? StringnumberHelper.roundToDigits(this.currentAircraft.cruiseClimbSpeed.getValue(SpeedUnit.FPM), 0).toString()
                : '',
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(9999)
                ]
            ],
        });
    }
}
