import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Aircraft} from '../../../../domain/model/aircraft';
import {WeightUnit} from '../../../../../geo-physics/domain/model/quantities/weight-unit';
import {LengthUnit} from '../../../../../geo-physics/domain/model/quantities/length-unit';
import {WnbEnvelopeCoordinate} from '../../../../domain/model/wnb-envelope-coordinate';
import {WnbEnvelope} from '../../../../domain/model/wnb-envelope';
import {MatDialog} from '@angular/material/dialog';
import {
    AircraftWnbEditEnvelopeDefinitionFormDialogComponent
} from '../aircraft-wnb-edit-envelope-definition-form-dialog/aircraft-wnb-edit-envelope-definition-form-dialog.component';
import {WnbEnvelopeArmDirection} from '../../../../domain/model/wnb-envelope-arm-direction';
import {ButtonColor} from '../../../../../common/view/model/button-color';


@Component({
    selector: 'app-aircraft-wnb-envelope-list',
    templateUrl: './aircraft-wnb-envelope-list.component.html',
    styleUrls: ['./aircraft-wnb-envelope-list.component.scss']
})
export class AircraftWnbEnvelopeListComponent implements OnInit {
    @Input() currentAircraft: Aircraft;
    @Input() wnbLengthUnit: LengthUnit;
    @Input() weightUnit: WeightUnit;
    @Output() envelopeAdded = new EventEmitter<WnbEnvelope>();
    @Output() envelopeUpdated = new EventEmitter<[WnbEnvelope, WnbEnvelope]>();
    @Output() envelopeDeleted = new EventEmitter<WnbEnvelope>();
    @Output() envelopeCoordinateAdded = new EventEmitter<[WnbEnvelope, WnbEnvelopeCoordinate, number]>();
    @Output() envelopeCoordinateUpdated = new EventEmitter<[WnbEnvelope, WnbEnvelopeCoordinate, WnbEnvelopeCoordinate]>();
    @Output() envelopeCoordinateDeleted = new EventEmitter<[WnbEnvelope, WnbEnvelopeCoordinate]>();

    protected readonly ButtonColor = ButtonColor;


    constructor(
        private dialog: MatDialog,
    ) {
    }


    ngOnInit() {
    }


    protected getArmDirectionText(armDirection: WnbEnvelopeArmDirection) {
        return armDirection === WnbEnvelopeArmDirection.LONGITUDINAL ? 'Longitudinal' : 'Lateral';
    }


    protected onAddEnvelopeClick() {
        this.openDialog(null, true);
    }


    protected onEditEnvelopeDefinitionClick(envelope: WnbEnvelope) {
        this.openDialog(envelope, false);
    }


    protected onEnvelopeCoordinateAdded($event: [WnbEnvelope, WnbEnvelopeCoordinate, number]) {
        this.envelopeCoordinateAdded.emit($event);
    }


    protected onEnvelopeCoordinateUpdated($event: [WnbEnvelope, WnbEnvelopeCoordinate, WnbEnvelopeCoordinate]) {
        this.envelopeCoordinateUpdated.emit($event);
    }


    protected onEnvelopeCoordinateDeleted($event: [WnbEnvelope, WnbEnvelopeCoordinate]) {
        this.envelopeCoordinateDeleted.emit($event);
    }


    private openDialog(envelope: WnbEnvelope, isNewEnvelope: boolean) {
        const dialogRef = this.dialog.open(AircraftWnbEditEnvelopeDefinitionFormDialogComponent, {
            // height: '800px',
            width: '600px',
            data: {
                isNewEnvelope: isNewEnvelope,
                envelope: envelope,
                lengthUnit: this.wnbLengthUnit,
                weightUnit: this.weightUnit,
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result && result.action === 'add') {
                this.envelopeAdded.emit(result.envelope);
            } else if (result && result.action === 'update') {
                this.envelopeUpdated.emit([result.oldEnvelope, result.newEnvelope]);
            } else if (result && result.action === 'delete') {
                this.envelopeDeleted.emit(result.envelope);
            }
        });
    }
}
