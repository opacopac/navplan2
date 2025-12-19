import {Component, Input, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {MapPopupNotamListComponent} from '../../../../notam/view/ng-components/map-popup-notam-list/map-popup-notam-list.component';
import {Notam} from '../../../../notam/domain/model/notam';


@Component({
    selector: 'app-plan-notam-table',
    imports: [
        CommonModule,
        MatTableModule,
        MapPopupNotamListComponent
    ],
    templateUrl: './plan-notam-table.component.html',
    styleUrls: ['./plan-notam-table.component.scss']
})
export class PlanNotamTableComponent implements OnInit {
    @Input() public notamList: Notam[];


    constructor() {
    }


    ngOnInit(): void {
    }


    public getColumnKeys(): string[] {
        return ['location', 'notam'];
    }
}
