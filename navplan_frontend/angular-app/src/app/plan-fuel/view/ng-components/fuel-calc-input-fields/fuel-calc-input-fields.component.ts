import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Consumption} from '../../../../geo-physics/domain/model/quantities/consumption';
import {ConsumptionUnit} from '../../../../geo-physics/domain/model/quantities/consumption-unit';
import {Aircraft} from '../../../../aircraft/domain/model/aircraft';
import {AircraftManualToggle} from '../../../../aircraft/view/ng-components/aircraft-manual-toggle/aircraft-manual-toggle.component';
import {ConsumptionInputComponent} from '../../../../geo-physics/view/ng-components/consumption-input/consumption-input.component';

@Component({
    selector: 'app-fuel-calc-input-fields',
    imports: [
        AircraftManualToggle,
        ConsumptionInputComponent,
    ],
    templateUrl: './fuel-calc-input-fields.component.html',
    styleUrls: ['./fuel-calc-input-fields.component.scss']
})
export class FuelCalcInputFieldsComponent {
    @Input() fuelConsumption: Consumption;
    @Input() useAircraftValue: boolean;
    @Input() consumptionUnit: ConsumptionUnit;
    @Input() selectedAircraft: Aircraft;
    @Output() fuelConsumptionChange = new EventEmitter<Consumption>();
    @Output() useAircraftValueChange = new EventEmitter<boolean>();


    protected onFuelConsumptionChanged(consumption: Consumption) {
        this.fuelConsumptionChange.emit(consumption);
    }


    protected onUseAircraftValueChanged(useAircraftConsumption: boolean) {
        this.useAircraftValueChange.emit(useAircraftConsumption);
    }
}
