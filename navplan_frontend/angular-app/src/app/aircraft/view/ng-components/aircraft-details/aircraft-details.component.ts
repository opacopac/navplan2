import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Aircraft} from '../../../domain/model/aircraft';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Consumption} from '../../../../geo-physics/domain/model/quantities/consumption';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {ConsumptionUnit} from '../../../../geo-physics/domain/model/quantities/consumption-unit';
import {VehicleType} from '../../../domain/model/vehicle-type';
import {FuelType} from '../../../domain/model/fuel-type';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';


@Component({
    selector: 'app-aircraft-details',
    templateUrl: './aircraft-details.component.html',
    styleUrls: ['./aircraft-details.component.scss']
})
export class AircraftDetailsComponent implements OnInit {
    @Input() currentAircraft: Aircraft;
    @Input() speedUnit: SpeedUnit;
    @Input() consumptionUnit: ConsumptionUnit;
    @Output() onVehicleTypeChange = new EventEmitter<VehicleType>();
    @Output() onRegistrationChange = new EventEmitter<string>();
    @Output() onIcaoTypeChange = new EventEmitter<string>();
    @Output() onCruiseSpeedChange = new EventEmitter<Speed>();
    @Output() onCruiseFuelChange = new EventEmitter<Consumption>();
    @Output() onFuelTypeChange = new EventEmitter<FuelType>();
    @Output() onSaveAircraftClick = new EventEmitter<void>();

    protected readonly VehicleType = VehicleType;
    protected readonly FuelType = FuelType;
    protected readonly Speed = Speed;
    protected readonly Consumption = Consumption;
    protected aircraftDetailsForm: FormGroup;


    constructor(private formBuilder: FormBuilder) {
    }


    ngOnInit() {
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
            'icaoType': [this.currentAircraft.icaoType, [
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
            'fuelType': [this.currentAircraft.fuelType ?? '', []]
        });
    }


    protected onVehicleTypeChanged() {
        if (this.aircraftDetailsForm.controls['vehicleType'].valid) {
            this.onVehicleTypeChange.emit(this.aircraftDetailsForm.value.vehicleType);
        }
    }


    protected onRegistrationChanged() {
        if (this.aircraftDetailsForm.controls['registration'].valid) {
            this.onRegistrationChange.emit(this.aircraftDetailsForm.value.registration);
        }
    }


    protected onIcaoTypeChanged() {
        if (this.aircraftDetailsForm.controls['icaoType'].valid) {
            this.onIcaoTypeChange.emit(this.aircraftDetailsForm.value.icaoType);
        }
    }


    protected onCruiseSpeedChanged() {
        if (this.aircraftDetailsForm.controls['cruiseSpeed'].valid) {
            const speed = new Speed(this.aircraftDetailsForm.value.cruiseSpeed, this.speedUnit);
            this.onCruiseSpeedChange.emit(speed);
        }
    }


    protected onCruiseFuelChanged() {
        if (this.aircraftDetailsForm.controls['cruiseFuel'].valid) {
            const fuel = new Consumption(this.aircraftDetailsForm.value.cruiseFuel, this.consumptionUnit);
            this.onCruiseFuelChange.emit(fuel);
        }
    }


    protected onFuelTypeChanged() {
        if (this.aircraftDetailsForm.controls['fuelType'].valid) {
            if (this.aircraftDetailsForm.value.fuelType === '') {
                this.onFuelTypeChange.emit(null);
            } else {
                this.onFuelTypeChange.emit(this.aircraftDetailsForm.value.fuelType);
            }
        }
    }


    protected onSaveAircraftDetailsClicked() {
        if (this.aircraftDetailsForm.valid) {
            this.onSaveAircraftClick.emit();
        }
    }
}
