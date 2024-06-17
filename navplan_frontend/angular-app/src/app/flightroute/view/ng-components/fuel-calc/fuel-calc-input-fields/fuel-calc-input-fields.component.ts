import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Consumption} from '../../../../../geo-physics/domain/model/quantities/consumption';
import {ConsumptionUnit} from '../../../../../geo-physics/domain/model/quantities/consumption-unit';
import {TimeUnit} from '../../../../../geo-physics/domain/model/quantities/time-unit';
import {Time} from '../../../../../geo-physics/domain/model/quantities/time';

@Component({
    selector: 'app-fuel-calc-input-fields',
    templateUrl: './fuel-calc-input-fields.component.html',
    styleUrls: ['./fuel-calc-input-fields.component.scss']
})
export class FuelCalcInputFieldsComponent implements OnInit {
    @Input() consumptionUnit: ConsumptionUnit;

    @Input() set aircraftConsumption(value: Consumption) {
        this.aircraftConsumptionValue = value && !value.isZero() ? value.getValue(this.consumptionUnit).toString() : '';
    }

    @Input() set extraTime(value: Time) {
        this.extraTimeValue = value && !value.isZero() ? value.min.toString() : '';
    }

    @Output() aircraftConsumptionChange = new EventEmitter<Consumption>();
    @Output() extraTimeChange = new EventEmitter<Time>();

    protected aircraftConsumptionValue: string;
    protected extraTimeValue: string;
    protected readonly Consumption = Consumption;


    constructor() {
    }


    ngOnInit() {
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
