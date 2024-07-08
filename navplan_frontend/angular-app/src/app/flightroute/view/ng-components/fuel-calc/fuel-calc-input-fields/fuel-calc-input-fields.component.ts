import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Consumption} from '../../../../../geo-physics/domain/model/quantities/consumption';
import {ConsumptionUnit} from '../../../../../geo-physics/domain/model/quantities/consumption-unit';
import {TimeUnit} from '../../../../../geo-physics/domain/model/quantities/time-unit';
import {Time} from '../../../../../geo-physics/domain/model/quantities/time';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-fuel-calc-input-fields',
    templateUrl: './fuel-calc-input-fields.component.html',
    styleUrls: ['./fuel-calc-input-fields.component.scss']
})
export class FuelCalcInputFieldsComponent implements OnInit {
    @Input() aircraftConsumption: Consumption;
    @Input() consumptionUnit: ConsumptionUnit;
    @Input() extraTime: Time;

    @Output() aircraftConsumptionChange = new EventEmitter<Consumption>();
    @Output() extraTimeChange = new EventEmitter<Time>();

    protected readonly Consumption = Consumption;
    protected consumptionInput: FormControl;
    protected extraTimeInput: FormControl;


    constructor() {
    }


    ngOnInit() {
        this.consumptionInput = new FormControl(this.getAircaftConsumptionString(), [
            Validators.required,
            Validators.min(1),
            Validators.max(999)
        ]);
        this.extraTimeInput = new FormControl(this.getExtraTimeString(), [
            Validators.required,
            Validators.min(0),
            Validators.max(999)
        ]);
    }


    protected getAircaftConsumptionString(): string {
        return this.aircraftConsumption && !this.aircraftConsumption.isZero()
            ? this.aircraftConsumption.getValue(this.consumptionUnit).toString()
            : '';
    }


    protected getExtraTimeString(): string {
        return this.extraTime
            ? this.extraTime.getValue(TimeUnit.M).toString()
            : '0';
    }


    protected onAircraftConsumptionChange(valueString: string) {
        const value = parseInt(valueString, 10);
        const consumption = new Consumption(value, this.consumptionUnit);
        this.aircraftConsumptionChange.emit(consumption);
    }


    protected onExtraTimeChange(valueString: string) {
        const value = parseInt(valueString, 10);
        const extraTime = new Time(value, TimeUnit.M);
        this.extraTimeChange.emit(extraTime);
    }
}
