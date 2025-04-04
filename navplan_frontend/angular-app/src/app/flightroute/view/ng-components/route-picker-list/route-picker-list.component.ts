import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FlightrouteListEntry} from '../../../domain/model/flightroute-list-entry';
import {ButtonColor} from '../../../../common/view/model/button-color';


export interface ListEntry {
    id: number;
    title: string;
}


@Component({
    selector: 'app-route-picker-list',
    templateUrl: './route-picker-list.component.html',
    styleUrls: ['./route-picker-list.component.scss']
})
export class RoutePickerListComponent implements OnInit, OnChanges {
    @Input() flightrouteList: FlightrouteListEntry[];
    @Output() loadRouteClicked = new EventEmitter<number>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public dataSource: MatTableDataSource<ListEntry>;
    public visibleColumns = ['name'];

    protected readonly ButtonColor = ButtonColor;


    constructor() {
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
}
