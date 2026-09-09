import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Notam} from '../../../domain/model/notam';
import {MapPopupNotamListComponent} from '../map-popup-notam-list/map-popup-notam-list.component';


@Component({
    selector: 'app-map-popup-notam-tab',
    imports: [
        MapPopupNotamListComponent
    ],
    templateUrl: './map-popup-notam-tab.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./map-popup-notam-tab.component.scss']
})
export class MapPopupNotamTabComponent implements OnInit {
    @Input() notams: Notam[];


    constructor() {
    }


    ngOnInit() {
    }
}
