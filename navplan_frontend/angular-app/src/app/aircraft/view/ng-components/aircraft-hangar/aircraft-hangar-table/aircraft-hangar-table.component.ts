import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ButtonColor} from '../../../../../common/view/model/button-color';
import {AircraftListEntry} from '../../../../domain/model/aircraft-list-entry';
import {Aircraft} from '../../../../domain/model/aircraft';
import {MatDialog} from '@angular/material/dialog';
import {SpeedUnit} from '../../../../../geo-physics/domain/model/quantities/speed-unit';
import {ConsumptionUnit} from '../../../../../geo-physics/domain/model/quantities/consumption-unit';
import {AircraftCreateFormDialogComponent} from '../aircraft-create-form-dialog/aircraft-create-form-dialog.component';
import {
    AircraftDeleteConfirmDialogComponent
} from '../aircraft-delete-confirm-dialog/aircraft-delete-confirm-dialog.component';
import {TextFilterState} from '../../../../../common/state/model/text-filter-state';
import {TableState} from '../../../../../common/state/model/table-state';


export interface ListEntry {
    id: number;
    vehicleType: string;
    registration: string;
    icaoType: string;
}


@Component({
    selector: 'app-aircraft-hangar-table',
    templateUrl: './aircraft-hangar-table.component.html',
    styleUrls: ['./aircraft-hangar-table.component.scss']
})
export class AircraftHangarTableComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() aircraftList: AircraftListEntry[];
    @Input() currentAircraft: Aircraft;
    @Input() speedUnit: SpeedUnit;
    @Input() consumptionUnit: ConsumptionUnit;
    @Input() tableState: TableState;
    @Output() aircraftCreated = new EventEmitter<Aircraft>();
    @Output() selectAircraftClick = new EventEmitter<number>();
    @Output() editAircraftClick = new EventEmitter<number>();
    @Output() duplicateAircraftClick = new EventEmitter<number>();
    @Output() deleteAircraftClick = new EventEmitter<number>();
    @Output() tableStateChanged = new EventEmitter<TableState>();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    protected readonly dataSource = new MatTableDataSource<ListEntry>();
    protected readonly visibleColumns = ['vehicleType', 'registration', 'icaoType', 'icons'];
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


    protected onFilterTextChanged(textFilterState: TextFilterState) {
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


    protected getAircraftIconClass(aircraft: AircraftListEntry): string {
        switch (aircraft.vehicleType) {
            case 'HELICOPTER':
                return 'fa-solid fa-helicopter';
            case 'AIRPLANE':
            default:
                return 'fa-solid fa-plane';
        }
    }


    protected onCreateAircraftClick() {
        const dialogRef = this.dialog.open(AircraftCreateFormDialogComponent, {
            // height: '800px',
            width: '600px',
            data: {
                speedUnit: this.speedUnit,
                consumptionUnit: this.consumptionUnit,
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.aircraftCreated.emit(result.aircraft);
            }
        });
    }


    protected onDeleteAircraftClick(aircraft: AircraftListEntry) {
        const dialogRef = this.dialog.open(AircraftDeleteConfirmDialogComponent, {
            width: '400px',
            data: {
                aircraft: aircraft
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result && result.confirmDeletion) {
                this.deleteAircraftClick.emit(aircraft.id);
            }
        });
    }


    private initTable() {
        if (this.aircraftList && this.paginator) {
            this.dataSource.data = this.aircraftList;
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
