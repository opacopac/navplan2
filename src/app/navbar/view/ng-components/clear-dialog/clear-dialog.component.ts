import {Component, OnInit} from '@angular/core';
import {FlightrouteActions} from '../../../../flightroute/state/ngrx/flightroute.actions';
import {TrackActions} from '../../../../track/state/ngrx/track.actions';
import {Store} from '@ngrx/store';
import {AirportChartActions} from '../../../../aerodrome/state/ngrx/airport-chart/airport-chart.actions';


@Component({
    selector: 'app-clear-dialog',
    templateUrl: './clear-dialog.component.html',
    styleUrls: ['./clear-dialog.component.css']
})
export class ClearDialogComponent implements OnInit {
    public constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onOKClicked() {
        this.appStore.dispatch(FlightrouteActions.clear());
        this.appStore.dispatch(TrackActions.clear());
        this.appStore.dispatch(AirportChartActions.closeAllAirportCharts());
    }
}
