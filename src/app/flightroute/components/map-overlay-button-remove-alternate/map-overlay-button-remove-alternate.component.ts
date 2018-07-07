import {Component, OnInit} from '@angular/core';
import {ButtonColor, ButtonSize} from '../../../shared/directives/button-base/button-base.directive';


@Component({
  selector: 'app-map-overlay-button-remove-alternate',
  templateUrl: './map-overlay-button-remove-alternate.component.html',
  styleUrls: ['./map-overlay-button-remove-alternate.component.css']
})
export class MapOverlayButtonRemoveAlternateComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    ngOnInit() {
    }


    public onRemoveAlternateClicked() {
        /*this.session.flightroute$
            .pipe(first())
            .subscribe((route) => {
                route.waypointList.alternate = undefined;
            });*/
    }
}
