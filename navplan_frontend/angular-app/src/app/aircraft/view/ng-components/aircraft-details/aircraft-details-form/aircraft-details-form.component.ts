import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Aircraft} from '../../../../domain/model/aircraft';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Consumption} from '../../../../../geo-physics/domain/model/quantities/consumption';
import {Speed} from '../../../../../geo-physics/domain/model/quantities/speed';
import {SpeedUnit} from '../../../../../geo-physics/domain/model/quantities/speed-unit';
import {ConsumptionUnit} from '../../../../../geo-physics/domain/model/quantities/consumption-unit';
import {VehicleType} from '../../../../domain/model/vehicle-type';
import {FuelType} from '../../../../domain/model/fuel-type';
import {StringnumberHelper} from '../../../../../system/domain/service/stringnumber/stringnumber-helper';


@Component({
    selector: 'app-aircraft-details-form',
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
    @Output() saveAircraftClicked = new EventEmitter<void>();

    protected readonly VehicleType = VehicleType;
    protected readonly FuelType = FuelType;
    protected readonly Speed = Speed;
    protected readonly Consumption = Consumption;
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
            ]]
        });
    }
}
