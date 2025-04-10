import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Consumption} from '../../../../geo-physics/domain/model/quantities/consumption';
import {ConsumptionUnit} from '../../../../geo-physics/domain/model/quantities/consumption-unit';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Aircraft} from '../../../../aircraft/domain/model/aircraft';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AircraftViewModule} from '../../../../aircraft/view/aircraft-view.module';
import {MatInputModule} from '@angular/material/input';

@Component({
    selector: 'app-fuel-calc-input-fields',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        AircraftViewModule,
    ],
    templateUrl: './fuel-calc-input-fields.component.html',
    styleUrls: ['./fuel-calc-input-fields.component.scss']
})
export class FuelCalcInputFieldsComponent implements OnInit, OnChanges {
    @Input() fuelConsumption: Consumption;
    @Input() useAircraftValue: boolean;
    @Input() consumptionUnit: ConsumptionUnit;
    @Input() selectedAircraft: Aircraft;
    @Output() fuelConsumptionChange = new EventEmitter<Consumption>();
    @Output() useAircraftValueChange = new EventEmitter<boolean>();

    protected readonly Consumption = Consumption;
    protected consumptionInput: FormControl;


    constructor() {
    }


    ngOnInit() {
        this.consumptionInput = new FormControl(
            {value: this.getFuelConsumptionString(), disabled: this.useAircraftValue},
            [
                Validators.required,
                Validators.min(1),
                Validators.max(999)
            ]
        );
    }


    ngOnChanges() {
        if (this.useAircraftValue) {
            this.consumptionInput?.disable();
        } else {
            this.consumptionInput?.enable();
        }
    }


    protected getFuelConsumptionString(): string {
        return this.fuelConsumption && !this.fuelConsumption.isZero()
            ? this.fuelConsumption.getValue(this.consumptionUnit).toString()
            : '';
    }


    protected onFuelConsumptionChange(valueString: string) {
        const value = parseInt(valueString, 10);
        const consumption = new Consumption(value, this.consumptionUnit);
        this.fuelConsumptionChange.emit(consumption);
    }


    protected onUseAircraftValueChanged(useAircraftConsumption: boolean) {
        this.useAircraftValueChange.emit(useAircraftConsumption);
    }
}
