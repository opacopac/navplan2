import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../services/utils/session.service';
import {MessageService} from '../../services/utils/message.service';
import {Sessioncontext} from '../../model/sessioncontext';
import {UserService} from '../../services/user/user.service';
import {FlightrouteService} from '../../services/flightroute/flightroute.service';
import {Flightroute} from '../../model/flightroute';
import {ButtonColor, ButtonSize} from '../buttons/button-base.directive';


@Component({
    selector: 'app-flightroute',
    templateUrl: './flightroute.component.html',
    styleUrls: ['./flightroute.component.css']
})
export class FlightrouteComponent implements OnInit {
    public session: Sessioncontext;
    public flightrouteList: Flightroute[] = [];
    public selectedFlightrouteId: number;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor(public userService: UserService,
                public flightrouteService: FlightrouteService,
                public sessionService: SessionService,
                private messageService: MessageService) {

        this.session = sessionService.getSessionContext();
    }


    ngOnInit() {
        this.selectedFlightrouteId = -1;
        if (this.sessionService.isLoggedIn()) {
            this.flightrouteService.readFlightrouteList(
                this.readTrackListSuccessCallback.bind(this),
                this.readTrackListErrorCallback.bind(this)
            );
        }
    }


    private readTrackListSuccessCallback(flightrouteList: Flightroute[]) {
        this.flightrouteList = flightrouteList;
    }


    private readTrackListErrorCallback(message: string) {
        this.flightrouteList = [];
        // TODO: error?
    }


    onLoadFlightrouteClicked() {
        if (this.selectedFlightrouteId > 0) {
            this.flightrouteService.readFlightroute(
                this.selectedFlightrouteId,
                this.readFlightrouteSuccessCallback.bind(this),
                this.readFlightrouteErrorCallback.bind(this)
            );
        }
    }


    private readFlightrouteSuccessCallback(flightroute: Flightroute) {
        flightroute.recalcWaypointsAndFuel();
        this.session.flightroute = flightroute;
    }


    private readFlightrouteErrorCallback(message: string) {
        this.flightrouteList = [];
        // TODO: error?
    }


    onSaveFlightrouteClicked() {
    }


    onSaveFlightrouteCopyClicked() {
    }


    onDeleteFlightrouteClicked() {
    }


    onReverseWaypointsClicked() {
    }


    onExportFlightroutePdfClicked() {
    }


    onExportFlightrouteExcelClicked() {
    }

}
