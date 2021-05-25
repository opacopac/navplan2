import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-ol-overlay-button-remove-alternate',
  templateUrl: './ol-overlay-button-remove-alternate.component.html',
  styleUrls: ['./ol-overlay-button-remove-alternate.component.css']
})
export class OlOverlayButtonRemoveAlternateComponent implements OnInit {
    @Output() public removeAlternateClick: EventEmitter<null> = new EventEmitter<null>();


    ngOnInit() {
    }
}
