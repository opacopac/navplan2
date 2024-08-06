import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {AircraftListEntry} from '../../../domain/model/aircraft-list-entry';
import {Aircraft} from '../../../domain/model/aircraft';


export interface ListEntry {
    id: number;
    vehicleType: string;
    registration: string;
    icaoType: string;
}


@Component({
    selector: 'app-aircraft-list',
    templateUrl: './aircraft-list.component.html',
    styleUrls: ['./aircraft-list.component.scss']
})
export class AircraftListComponent implements OnInit, OnChanges {
    @Input() aircraftList: AircraftListEntry[];
    @Input() currentAircraft: Aircraft;
    @Output() onSelectAircraftClick = new EventEmitter<number>();
    @Output() onEditAircraftClick = new EventEmitter<number>();
    @Output() onDuplicateAircraftClick = new EventEmitter<number>();
    @Output() onDeleteAircraftClick = new EventEmitter<number>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    protected dataSource: MatTableDataSource<ListEntry>;
    protected visibleColumns = ['vehicleType', 'registration', 'icaoType', 'icons'];

    protected readonly ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        this.dataSource = new MatTableDataSource<ListEntry>(this.aircraftList);
        this.dataSource.paginator = this.paginator;
    }


    protected applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    protected getAircraftIconClass(aircraft: AircraftListEntry): string {
        switch (aircraft.vehicleType) {
            case 'HELICOPTER': return 'fa-solid fa-helicopter';
            case 'AIRPLANE':
            default:
                return 'fa-solid fa-plane';
        }
    }
}
