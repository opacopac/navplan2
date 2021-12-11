import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FlightrouteListEntry} from '../../../../flightroute/domain-model/flightroute-list-entry';


export interface ListEntry {
    id: number;
    title: string;
}


@Component({
    selector: 'app-flightroute-list',
    templateUrl: './flightroute-list.component.html',
    styleUrls: ['./flightroute-list.component.css']
})
export class FlightrouteListComponent implements OnInit, OnChanges {
    @Input() flightrouteList: FlightrouteListEntry[];
    @Output() onLoadRouteClick = new EventEmitter<number>();
    @Output() onDeleteRouteClick = new EventEmitter<number>();
    @Output() onDuplicateRouteClick = new EventEmitter<number>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public dataSource: MatTableDataSource<ListEntry>;
    public visibleColumns = ['name', 'icons'];


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
