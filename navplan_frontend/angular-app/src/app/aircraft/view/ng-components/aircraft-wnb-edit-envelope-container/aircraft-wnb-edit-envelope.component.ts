import {Component, Input, OnInit} from '@angular/core';
import {Weight} from '../../../../geo-physics/domain/model/quantities/weight';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {WnbEnvelope} from '../../../domain/model/wnb-envelope';

@Component({
    selector: 'app-aircraft-wnb-edit-envelope',
    templateUrl: './aircraft-wnb-edit-envelope.component.html',
    styleUrls: ['./aircraft-wnb-edit-envelope.component.scss']
})
export class AircraftWnbEditEnvelopeComponent implements OnInit {
    @Input() public lengthUnit: LengthUnit;
    @Input() public weightUnit: WeightUnit;
    @Input() public envelope: WnbEnvelope;


    constructor() {
    }


    ngOnInit() {
    }


    protected onEnvelopeClicked($event: [Length, Weight]) {
        console.log($event);
        // TODO
    }
}
