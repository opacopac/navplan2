import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ButtonColor} from '../../../../../common/view/model/button-color';
import {MatDialog} from '@angular/material/dialog';
import {SpeedUnit} from '../../../../../geo-physics/domain/model/quantities/speed-unit';
import {ConsumptionUnit} from '../../../../../geo-physics/domain/model/quantities/consumption-unit';
import {FlightrouteListEntry} from '../../../../domain/model/flightroute-list-entry';
import {Flightroute} from '../../../../domain/model/flightroute';
import {
    FlightrouteDeleteConfirmDialogComponent
} from '../../plan-route/flightroute-delete-confirm-dialog/flightroute-delete-confirm-dialog.component';
import {
    AircraftCreateFormDialogComponent
} from '../../../../../aircraft/view/ng-components/aircraft-hangar/aircraft-create-form-dialog/aircraft-create-form-dialog.component';
import {Aircraft} from '../../../../../aircraft/domain/model/aircraft';
import {RouteCreateFormDialogComponent} from '../route-create-form-dialog/route-create-form-dialog.component';


export interface ListEntry {
    id: number;
    title: string;
}


@Component({
    selector: 'app-route-list',
    templateUrl: './route-list.component.html',
    styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent implements OnInit, OnChanges {
    @Input() routeList: FlightrouteListEntry[];
    @Input() currentFlightroute: Flightroute;
    @Input() speedUnit: SpeedUnit;
    @Input() consumptionUnit: ConsumptionUnit;
    @Output() flightrouteCreated = new EventEmitter<Flightroute>();
    @Output() selectFlightrouteClick = new EventEmitter<number>();
    @Output() editFlightrouteClick = new EventEmitter<number>();
    @Output() duplicateFlightrouteClick = new EventEmitter<number>();
    @Output() deleteFlightrouteClick = new EventEmitter<number>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    protected dataSource: MatTableDataSource<ListEntry>;
    protected visibleColumns = ['title', 'icons'];

    protected readonly ButtonColor = ButtonColor;


    constructor(
        private dialog: MatDialog,
    ) {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        this.dataSource = new MatTableDataSource<ListEntry>(this.routeList);
        this.dataSource.paginator = this.paginator;
    }


    protected applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    protected onCreateNewRouteClick() {
        const dialogRef = this.dialog.open(RouteCreateFormDialogComponent, {
            // height: '800px',
            width: '600px',
            data: {
                speedUnit: this.speedUnit,
                consumptionUnit: this.consumptionUnit,
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.flightrouteCreated.emit(result.aircraft);
            }
        });
    }


    protected onDeleteFlightrouteClick(route: FlightrouteListEntry) {
        const dialogRef = this.dialog.open(FlightrouteDeleteConfirmDialogComponent, {
            width: '400px',
            data: {
                flightroute: route
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result && result.confirmDeletion) {
                this.deleteFlightrouteClick.emit(route.id);
            }
        });
    }
}
