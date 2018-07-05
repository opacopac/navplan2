import {first} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonColor, ButtonSize} from '../../../shared/directives/button-base/button-base.directive';
import {SessionService} from '../../../core/services/session/session.service';
import {Sessioncontext} from '../../../model/session/sessioncontext';


@Component({
  selector: 'app-map-overlay-button-remove-alternate',
  templateUrl: './map-overlay-button-remove-alternate.component.html',
  styleUrls: ['./map-overlay-button-remove-alternate.component.css']
})
export class MapOverlayButtonRemoveAlternateComponent implements OnInit, OnDestroy {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    public session: Sessioncontext;


    constructor(
        private sessionService: SessionService) {

        this.session = this.sessionService.getSessionContext();
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    public onRemoveAlternateClicked() {
        this.session.flightroute$
            .pipe(first())
            .subscribe((route) => {
                route.waypointList.alternate = undefined;
            });
    }
}
