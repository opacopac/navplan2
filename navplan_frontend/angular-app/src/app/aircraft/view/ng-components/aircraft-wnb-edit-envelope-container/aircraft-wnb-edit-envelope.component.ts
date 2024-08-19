import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {WnbEnvelope} from '../../../domain/model/wnb-envelope';
import {WnbEnvelopeCoordinate} from '../../../domain/model/wnb-envelope-coordinate';
import {
    AircraftWnbEditEnvelopeCoordinateDialogComponent
} from '../aircraft-wnb-edit-envelope-coordinate-dialog/aircraft-wnb-edit-envelope-coordinate-dialog.component';
import {MatDialog} from '@angular/material/dialog';

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
    @Output() public coordinateUpdated = new EventEmitter<[WnbEnvelope, WnbEnvelopeCoordinate, WnbEnvelopeCoordinate]>();
    @Output() public coordinateDeleted = new EventEmitter<[WnbEnvelope, WnbEnvelopeCoordinate]>();


    constructor(
        private dialog: MatDialog,
    ) {
    }


    ngOnInit() {
    }


    protected onAddEnvelopeCoordinateClicked(coord: WnbEnvelopeCoordinate) {
        this.openDialog(coord, true);
    }


    protected onEditEnvelopeCoordinateClicked(coord: WnbEnvelopeCoordinate) {
        this.openDialog(coord, false);
    }


    private openDialog(coordinate: WnbEnvelopeCoordinate, isNewCoordinate: boolean) {
        const dialogRef = this.dialog.open(AircraftWnbEditEnvelopeCoordinateDialogComponent, {
            // height: '800px',
            width: '600px',
            data: {
                isNewCoordinate: isNewCoordinate,
                coordinate: coordinate,
                lengthUnit: this.lengthUnit,
                weightUnit: this.weightUnit,
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result && result.action === 'add') {
                this.coordinateAdded.emit([this.envelope, result.coordinate]);
            } else if (result && result.action === 'update') {
                this.coordinateUpdated.emit([this.envelope, result.oldCoordinate, result.newCoordinate]);
            } else if (result && result.action === 'delete') {
                this.coordinateDeleted.emit([this.envelope, result.coordinate]);
            }
        });
    }
}
