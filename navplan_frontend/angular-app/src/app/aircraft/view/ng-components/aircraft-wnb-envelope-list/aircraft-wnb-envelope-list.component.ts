import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Aircraft} from '../../../domain/model/aircraft';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {WnbEnvelopeCoordinate} from '../../../domain/model/wnb-envelope-coordinate';
import {WnbEnvelope} from '../../../domain/model/wnb-envelope';
import {
    AircraftWnbEditEnvelopeDefinitionDialogComponent
} from '../aircraft-wnb-edit-envelope-definition-dialog/aircraft-wnb-edit-envelope-definition-dialog.component';
import {MatDialog} from '@angular/material/dialog';


export interface ListEntry {
    id: number;
    registration: string;
    type: string;
}


@Component({
    selector: 'app-aircraft-wnb-envelope-list',
    templateUrl: './aircraft-wnb-envelope-list.component.html',
    styleUrls: ['./aircraft-wnb-envelope-list.component.scss']
})
export class AircraftWnbEnvelopeListComponent implements OnInit {
    @Input() currentAircraft: Aircraft;
    @Input() wnbLengthUnit: LengthUnit;
    @Input() weightUnit: WeightUnit;
    @Output() addEnvelope = new EventEmitter<WnbEnvelope>();
    @Output() envelopeCoordinateAdded = new EventEmitter<[WnbEnvelope, WnbEnvelopeCoordinate, number]>();
    @Output() envelopeCoordinateUpdated = new EventEmitter<[WnbEnvelope, WnbEnvelopeCoordinate, WnbEnvelopeCoordinate]>();
    @Output() envelopeCoordinateDeleted = new EventEmitter<[WnbEnvelope, WnbEnvelopeCoordinate]>();

    constructor(
        private dialog: MatDialog,
    ) {
    }


    ngOnInit() {
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
        const dialogRef = this.dialog.open(AircraftWnbEditEnvelopeDefinitionDialogComponent, {
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
                this.addEnvelope.emit(envelope);
            } else if (result && result.action === 'update') {
                // this.coordinateUpdated.emit([this.envelope, result.oldCoordinate, result.newCoordinate]);
            } else if (result && result.action === 'delete') {
                // this.coordinateDeleted.emit([this.envelope, result.coordinate]);
            }
        });
    }
}
