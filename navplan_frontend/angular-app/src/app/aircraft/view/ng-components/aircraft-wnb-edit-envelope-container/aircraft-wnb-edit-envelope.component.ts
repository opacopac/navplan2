import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {WnbEnvelope} from '../../../domain/model/wnb-envelope';
import {WnbEnvelopeCoordinate} from '../../../domain/model/wnb-envelope-coordinate';

@Component({
    selector: 'app-aircraft-wnb-edit-envelope',
    templateUrl: './aircraft-wnb-edit-envelope.component.html',
    styleUrls: ['./aircraft-wnb-edit-envelope.component.scss']
})
export class AircraftWnbEditEnvelopeComponent implements OnInit {
    @Input() public lengthUnit: LengthUnit;
    @Input() public weightUnit: WeightUnit;
    @Input() public envelope: WnbEnvelope;
    @Output() public coordinateAdded = new EventEmitter<[WnbEnvelope, WnbEnvelopeCoordinate]>();


    constructor() {
    }


    ngOnInit() {
    }


    protected onEnvelopeClicked(coord: WnbEnvelopeCoordinate) {
        this.coordinateAdded.emit([this.envelope, coord]);
    }
}
