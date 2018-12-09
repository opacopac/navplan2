import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../../flightroute/model/waypoint';


@Component({
    selector: 'app-ol-overlay-button-set-alternate',
    templateUrl: './ol-overlay-button-set-alternate.component.html',
    styleUrls: ['./ol-overlay-button-set-alternate.component.css']
})
export class OlOverlayButtonSetAlternateComponent implements OnInit {
    @Input() public waypoint: Waypoint;
    @Output() public click: EventEmitter<Waypoint> = new EventEmitter<Waypoint>();


    ngOnInit() {
    }
}
