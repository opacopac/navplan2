import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Aircraft} from '../../../../aircraft/domain/model/aircraft';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {WnbLonEnvelopeCoordinate} from '../../../domain/model/wnb-lon-envelope-coordinate';
import {WnbEnvelope} from '../../../domain/model/wnb-envelope';
import {MatDialog} from '@angular/material/dialog';
import {
    AircraftWnbEditEnvelopeDefinitionFormDialogComponent
} from '../aircraft-wnb-edit-envelope-definition-form-dialog/aircraft-wnb-edit-envelope-definition-form-dialog.component';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {VehicleType} from '../../../../aircraft/domain/model/vehicle-type';
import {MatButtonModule} from '@angular/material/button';
import {IconButtonComponent} from '../../../../common/view/ng-components/icon-button/icon-button.component';
import {
    AircraftWnbEditEnvelopeComponent
} from '../aircraft-wnb-edit-envelope-container/aircraft-wnb-edit-envelope.component';


@Component({
    selector: 'app-aircraft-wnb-envelope-list',
    imports: [
        MatButtonModule,
        IconButtonComponent,
        AircraftWnbEditEnvelopeComponent
    ],
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
    @Output() envelopeCoordinateAdded = new EventEmitter<[WnbEnvelope, WnbLonEnvelopeCoordinate, number]>();
    @Output() envelopeCoordinateUpdated = new EventEmitter<[WnbEnvelope, WnbLonEnvelopeCoordinate, WnbLonEnvelopeCoordinate]>();
    @Output() envelopeCoordinateDeleted = new EventEmitter<[WnbEnvelope, WnbLonEnvelopeCoordinate]>();

    protected readonly ButtonColor = ButtonColor;


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


    protected onEnvelopeCoordinateAdded($event: [WnbEnvelope, WnbLonEnvelopeCoordinate, number]) {
        this.envelopeCoordinateAdded.emit($event);
    }


    protected onEnvelopeCoordinateUpdated($event: [WnbEnvelope, WnbLonEnvelopeCoordinate, WnbLonEnvelopeCoordinate]) {
        this.envelopeCoordinateUpdated.emit($event);
    }


    protected onEnvelopeCoordinateDeleted($event: [WnbEnvelope, WnbLonEnvelopeCoordinate]) {
        this.envelopeCoordinateDeleted.emit($event);
    }


    private openDialog(envelope: WnbEnvelope, isNewEnvelope: boolean) {
        const dialogRef = this.dialog.open(AircraftWnbEditEnvelopeDefinitionFormDialogComponent, {
            // height: '800px',
            width: '600px',
            data: {
                isNewEnvelope: isNewEnvelope,
                envelope: envelope,
                vehicleType: this.currentAircraft ? this.currentAircraft.vehicleType : VehicleType.AIRPLANE,
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
