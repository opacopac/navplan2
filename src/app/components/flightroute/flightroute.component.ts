import * as Rx from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionService } from '../../services/utils/session.service';
import { MessageService } from '../../services/utils/message.service';
import { Sessioncontext } from '../../model/sessioncontext';
import { UserService } from '../../services/user/user.service';
import { FlightrouteService } from '../../services/flightroute/flightroute.service';
import { Flightroute } from '../../model/flightroute';
import { ButtonColor, ButtonSize } from '../buttons/button-base.directive';


@Component({
    selector: 'app-flightroute',
    templateUrl: './flightroute.component.html',
    styleUrls: ['./flightroute.component.css']
})
export class FlightrouteComponent implements OnInit, OnDestroy {
    public session: Sessioncontext;
    public flightrouteList: Flightroute[];
    public currentFlightroute: Flightroute;
    public selectedFlightrouteId: number;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    private flightrouteListSubscription: Rx.Subscription;
    private currentFlightrouteSubscription: Rx.Subscription;


    constructor(public userService: UserService,
                public flightrouteService: FlightrouteService,
                public sessionService: SessionService,
                private messageService: MessageService) {

        this.session = sessionService.getSessionContext();
    }


    // region component life cycle

    ngOnInit() {
        // TODO: refactor => rx
        this.selectedFlightrouteId = -1;
        if (this.sessionService.isLoggedIn()) {
            this.flightrouteService.readFlightrouteList();
        }

        this.flightrouteListSubscription = this.flightrouteService.routeList$.subscribe(
            flightrouteList => { this.flightrouteList = flightrouteList; }
        );

        this.currentFlightrouteSubscription = this.flightrouteService.currentRoute$.subscribe(
            currentFlightroute => { this.currentFlightroute = currentFlightroute; }
        );
    }


    ngOnDestroy() {
        this.flightrouteListSubscription.unsubscribe();
        this.currentFlightrouteSubscription.unsubscribe();
    }

    // endregion


    onLoadFlightrouteClicked() {
        if (this.selectedFlightrouteId > 0) {
            this.flightrouteService.readFlightroute(this.selectedFlightrouteId);
        }
    }


    public onSaveFlightrouteClicked() {
    }


    public onSaveFlightrouteCopyClicked() {
    }


    public onDeleteFlightrouteClicked() {
    }


    public onExportFlightroutePdfClicked() {
    }


    public onExportFlightrouteExcelClicked() {
    }

}
