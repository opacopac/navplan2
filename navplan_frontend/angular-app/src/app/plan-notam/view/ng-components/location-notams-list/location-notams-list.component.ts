import {Component, Input, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {MapPopupNotamListComponent} from '../../../../notam/view/ng-components/map-popup-notam-list/map-popup-notam-list.component';
import {LocationNotam} from '../../../domain/model/location-notam';


@Component({
    selector: 'app-location-notams-list',
    imports: [
        CommonModule,
        MatTableModule,
        MapPopupNotamListComponent
    ],
    templateUrl: './location-notams-list.component.html',
    styleUrls: ['./location-notams-list.component.scss']
})
export class LocationNotamsListComponent implements OnInit {
    @Input() public locationNotams: LocationNotam[];


    constructor() {
    }


    ngOnInit(): void {
    }
}
