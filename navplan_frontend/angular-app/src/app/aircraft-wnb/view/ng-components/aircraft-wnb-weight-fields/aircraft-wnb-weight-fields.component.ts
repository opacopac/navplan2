import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Aircraft} from '../../../../aircraft/domain/model/aircraft';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {Weight} from '../../../../geo-physics/domain/model/quantities/weight';
import {WeightInputComponent} from '../../../../geo-physics/view/ng-components/weight-input/weight-input.component';


@Component({
    selector: 'app-aircraft-wnb-weight-fields',
    imports: [
        WeightInputComponent
    ],
    templateUrl: './aircraft-wnb-weight-fields.component.html',
    styleUrls: ['./aircraft-wnb-weight-fields.component.scss']
})
export class AircraftWnbWeightFieldsComponent {
    @Input() currentAircraft: Aircraft;
    @Input() weightUnit: WeightUnit;
    @Output() changeMtow = new EventEmitter<Weight>();
    @Output() changeBew = new EventEmitter<Weight>();


    protected onMtowChanged(weight: Weight) {
        this.changeMtow.emit(weight);
    }


    protected onBewChanged(weight: Weight) {
        this.changeBew.emit(weight);
    }
}
