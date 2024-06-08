import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-map-popup-waypoint-button-remove-alternate',
  templateUrl: './map-popup-waypoint-button-remove-alternate.component.html',
  styleUrls: ['./map-popup-waypoint-button-remove-alternate.component.scss']
})
export class MapPopupWaypointButtonRemoveAlternateComponent implements OnInit {
    @Output() public removeAlternateClick: EventEmitter<null> = new EventEmitter<null>();


    ngOnInit() {
    }
}
