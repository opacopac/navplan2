import {Component, Input, OnInit} from '@angular/core';
import {Waypoint} from '../../../flightroute/model/waypoint';


@Component({
  selector: 'app-ol-overlay-button-remove-alternate',
  templateUrl: './ol-overlay-button-remove-alternate.component.html',
  styleUrls: ['./ol-overlay-button-remove-alternate.component.css']
})
export class OlOverlayButtonRemoveAlternateComponent implements OnInit {
    @Input() waypoint: Waypoint;


    ngOnInit() {
    }


    public onRemoveAlternateClick() {
    }
}
