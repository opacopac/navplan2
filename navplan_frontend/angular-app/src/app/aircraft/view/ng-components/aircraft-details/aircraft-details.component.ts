import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Aircraft} from '../../../domain/model/aircraft';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Consumption} from '../../../../geo-physics/domain/model/quantities/consumption';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {ConsumptionUnit} from '../../../../geo-physics/domain/model/quantities/consumption-unit';


@Component({
    selector: 'app-aircraft-details',
    templateUrl: './aircraft-details.component.html',
    styleUrls: ['./aircraft-details.component.scss']
})
export class AircraftDetailsComponent implements OnInit {
    @Input() currentAircraft: Aircraft;
    @Input() speedUnit: SpeedUnit;
    @Input() consumptionUnit: ConsumptionUnit;
    @Output() onSaveAircraftClick = new EventEmitter<Aircraft>();

    protected readonly Speed = Speed;
    protected readonly Consumption = Consumption;
    protected aircraftDetailsForm: FormGroup;


    constructor(private formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.aircraftDetailsForm = this.formBuilder.group({
            'registration': [this.currentAircraft.registration, [
                Validators.required
            ]],
            'type': [this.currentAircraft.icaoType, [
                Validators.required
            ]],
            'speed': [this.currentAircraft.cruiseSpeed
                ? this.currentAircraft.cruiseSpeed.getValue(this.speedUnit).toString()
                : '',
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(999)
                ]
            ],
            'consumption': [this.currentAircraft.cruiseFuel
                ? this.currentAircraft.cruiseFuel.getValue(this.consumptionUnit).toString()
                : '',
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(999)
                ]
            ]
        });
    }


    protected isAirplane(): boolean {
        return this.currentAircraft.vehicleType === 'AIRPLANE';
    }


    protected isHelicopter(): boolean {
        return this.currentAircraft.vehicleType === 'HELICOPTER';
    }


    protected onSaveAircraftDetailsClicked() {
        if (this.aircraftDetailsForm.valid) {
            this.onSaveAircraftClick.emit(null); // TODO
        }
    }
}
