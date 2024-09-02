import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FlightrouteListEntry} from '../../../../domain/model/flightroute-list-entry';
import {ButtonColor} from '../../../../../common/view/model/button-color';
import {MatDialog} from '@angular/material/dialog';
import {
    FlightrouteDeleteConfirmDialogComponent
} from '../flightroute-delete-confirm-dialog/flightroute-delete-confirm-dialog.component';


export interface ListEntry {
    id: number;
    title: string;
}


@Component({
    selector: 'app-flightroute-list',
    templateUrl: './flightroute-list.component.html',
    styleUrls: ['./flightroute-list.component.scss']
})
export class FlightrouteListComponent implements OnInit, OnChanges {
    @Input() flightrouteList: FlightrouteListEntry[];
    @Output() loadRouteClicked = new EventEmitter<number>();
    @Output() deleteRouteClicked = new EventEmitter<number>();
    @Output() duplicateRouteClicked = new EventEmitter<number>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public dataSource: MatTableDataSource<ListEntry>;
    public visibleColumns = ['name', 'icons'];

    protected readonly ButtonColor = ButtonColor;


    constructor(
        private dialog: MatDialog,
    ) {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        this.dataSource = new MatTableDataSource<ListEntry>(this.flightrouteList);
        this.dataSource.paginator = this.paginator;
    }


    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    protected onDeleteRouteClicked(flightroute: FlightrouteListEntry) {
        const dialogRef = this.dialog.open(FlightrouteDeleteConfirmDialogComponent, {
            width: '400px',
            data: {
                flightroute: flightroute
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result && result.confirmDeletion) {
                this.deleteRouteClicked.emit(flightroute.id);
            }
        });
    }
}
