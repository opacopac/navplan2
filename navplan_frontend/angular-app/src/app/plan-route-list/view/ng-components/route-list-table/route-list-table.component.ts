import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {MatDialog} from '@angular/material/dialog';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {ConsumptionUnit} from '../../../../geo-physics/domain/model/quantities/consumption-unit';
import {FlightrouteListEntry} from '../../../../flightroute/domain/model/flightroute-list-entry';
import {Flightroute} from '../../../../flightroute/domain/model/flightroute';
import {
    RouteCreateFormDialogComponent
} from '../route-create-form-dialog/route-create-form-dialog.component';
import {TextFilterState} from '../../../../common/state/model/text-filter-state';
import {TableState} from '../../../../common/state/model/table-state';
import {
    TableTextFilterAndCreateButtonComponent
} from '../../../../common/view/ng-components/table-filter-and-create-button/table-text-filter-and-create-button.component';
import {
    IconButtonComponent
} from '../../../../common/view/ng-components/icon-button/icon-button.component';
import {CommonModule} from '@angular/common';
import {
    ConfirmDeleteDialogComponent
} from '../../../../common/view/ng-components/confirm-delete-dialog/confirm-delete-dialog-component.component';


export interface ListEntry {
    id: number;
    title: string;
}


@Component({
    selector: 'app-route-list-table',
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        IconButtonComponent,
        TableTextFilterAndCreateButtonComponent,
    ],
    templateUrl: './route-list-table.component.html',
    styleUrls: ['./route-list-table.component.scss']
})
export class RouteListTableComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() routeList: FlightrouteListEntry[] = [{id: 0, title: ''}];
    @Input() currentFlightroute: Flightroute;
    @Input() speedUnit: SpeedUnit;
    @Input() consumptionUnit: ConsumptionUnit;
    @Input() tableState: TableState;
    @Output() flightrouteCreated = new EventEmitter<Flightroute>();
    @Output() selectFlightrouteClick = new EventEmitter<number>();
    @Output() editFlightrouteClick = new EventEmitter<number>();
    @Output() duplicateFlightrouteClick = new EventEmitter<number>();
    @Output() deleteFlightrouteClick = new EventEmitter<number>();
    @Output() tableStateChanged = new EventEmitter<TableState>();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    protected readonly dataSource = new MatTableDataSource<ListEntry>();
    protected readonly visibleColumns = ['title', 'icons'];
    protected readonly ButtonColor = ButtonColor;


    constructor(
        private dialog: MatDialog,
    ) {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        this.initTable();
    }


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.initTable();
    }


    protected onTextFilterChanged(textFilterState: TextFilterState) {
        this.tableStateChanged.emit({
            textFilterState: textFilterState,
            paginatorState: {
                pageSize: this.paginator.pageSize,
                currentPage: this.paginator.pageIndex
            }
        });
    }


    protected onPageChange($event: PageEvent) {
        this.tableStateChanged.emit({
            textFilterState: this.tableState.textFilterState,
            paginatorState: {
                pageSize: $event.pageSize,
                currentPage: $event.pageIndex
            }
        });
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
        const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
            width: '400px',
            data: {
                title: 'Delete Flight Route "' + route.title + '"',
                text: 'Are you sure you want to delete this flight route?',

            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result && result.confirmDeletion) {
                this.deleteFlightrouteClick.emit(route.id);
            }
        });
    }


    private initTable(): void {
        if (this.routeList && this.paginator) {
            this.dataSource.data = this.routeList;
        }

        if (this.tableState && this.paginator) {
            this.paginator.pageSize = this.tableState.paginatorState.pageSize;
            this.paginator.pageIndex = this.tableState.paginatorState.currentPage;
        }

        if (this.tableState && this.dataSource) {
            this.dataSource.filter = this.tableState.textFilterState.filterText;
        }
    }
}
