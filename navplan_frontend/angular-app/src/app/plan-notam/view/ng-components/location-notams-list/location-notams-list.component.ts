import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {MatTableModule} from '@angular/material/table';

import {MapPopupNotamListComponent} from '../../../../notam/view/ng-components/map-popup-notam-list/map-popup-notam-list.component';
import {LocationNotam} from '../../../domain/model/location-notam';


@Component({
    selector: 'app-location-notams-list',
    imports: [
    MatTableModule,
    MapPopupNotamListComponent
],
    templateUrl: './location-notams-list.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./location-notams-list.component.scss']
})
export class LocationNotamsListComponent implements OnInit {
    @Input() public locationNotams: LocationNotam[];


    constructor() {
    }


    ngOnInit(): void {
    }
}
