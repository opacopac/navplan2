import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Consumption} from '../../../../../geo-physics/domain/model/quantities/consumption';
import {ConsumptionUnit} from '../../../../../geo-physics/domain/model/quantities/consumption-unit';
import {FormControl, Validators} from '@angular/forms';
import {Aircraft} from '../../../../../aircraft/domain/model/aircraft';

@Component({
    selector: 'app-fuel-calc-input-fields',
    templateUrl: './fuel-calc-input-fields.component.html',
    styleUrls: ['./fuel-calc-input-fields.component.scss']
})
export class FuelCalcInputFieldsComponent implements OnInit, OnChanges {
    @Input() aircraftConsumption: Consumption;
    @Input() useAircraftConsumptionValue: boolean;
    @Input() consumptionUnit: ConsumptionUnit;
    @Input() selectedAircraft: Aircraft;
    @Output() aircraftConsumptionChange = new EventEmitter<Consumption>();
    @Output() useAircraftConsumptionValueChange = new EventEmitter<boolean>();

    protected readonly Consumption = Consumption;
    protected consumptionInput: FormControl;


    constructor() {
    }


    ngOnInit() {
        this.consumptionInput = new FormControl(
            {value: this.getAircaftConsumptionString(), disabled: this.useAircraftConsumptionValue},
            [
                Validators.required,
                Validators.min(1),
                Validators.max(999)
            ]
        );
    }


    ngOnChanges() {
        if (this.useAircraftConsumptionValue) {
            this.consumptionInput?.disable();
        } else {
            this.consumptionInput?.enable();
        }
    }


    protected getAircaftConsumptionString(): string {
        return this.aircraftConsumption && !this.aircraftConsumption.isZero()
            ? this.aircraftConsumption.getValue(this.consumptionUnit).toString()
            : '';
    }


    protected onAircraftConsumptionChange(valueString: string) {
        const value = parseInt(valueString, 10);
        const consumption = new Consumption(value, this.consumptionUnit);
        this.aircraftConsumptionChange.emit(consumption);
    }


    protected onUseAircraftConsumptionChanged(useAircraftConsumption: boolean) {
        this.useAircraftConsumptionValueChange.emit(useAircraftConsumption);
    }
}
