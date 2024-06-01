import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-waypoint-button-remove-alternate',
  templateUrl: './waypoint-button-remove-alternate.component.html',
  styleUrls: ['./waypoint-button-remove-alternate.component.scss']
})
export class WaypointButtonRemoveAlternateComponent implements OnInit {
    @Output() public removeAlternateClick: EventEmitter<null> = new EventEmitter<null>();


    ngOnInit() {
    }
}
