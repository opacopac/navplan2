import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../../aerodrome/domain/model/airport';
import {Store} from '@ngrx/store';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';
import {IconButtonComponent} from '../../../../common/view/ng-components/icon-button/icon-button.component';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {MatDialog} from '@angular/material/dialog';
import {
    ConfirmDeleteDialogComponent
} from '../../../../common/view/ng-components/confirm-delete-dialog/confirm-delete-dialog-component.component';
import {User} from '../../../../user/domain/model/user';
import {AirportCircuit} from '../../../domain/model/airport-circuit';


@Component({
    selector: 'app-map-popup-circuits-tab',
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        IconButtonComponent
    ],
    templateUrl: './map-popup-circuit-tab.component.html',
    styleUrls: ['./map-popup-circuit-tab.component.scss']
})
export class MapPopupCircuitTabComponent implements OnInit {
    @Input() airport: Airport;
    @Input() circuits: AirportCircuit[];
    @Input() currentUser: User;
    protected readonly ButtonColor = ButtonColor;


    constructor(
        private appStore: Store<any>,
        private dialog: MatDialog
    ) {
    }


    ngOnInit() {
    }


    protected getChartColumns(): string[] {
        return ['name', 'icons'];
    }


    protected onDeleteClicked(circuit: AirportCircuit) {
        const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
            width: '400px',
            data: {
                title: 'Delete Aerodrome Circuit "' + circuit.name + '"',
                text: 'Are you sure you want to delete this circuit?'
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result && result.confirmDeletion) {
                // this.appStore.dispatch(AirportChartActions.deleteAirportChart({chart: chart}));
            }
        });
    }


    protected onAddClicked() {
        // this.appStore.dispatch(FlightMapActions.showUploadChartSidebar({selectedAirport: this.airport}));
    }
}
