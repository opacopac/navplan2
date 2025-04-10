import {Component, OnInit} from '@angular/core';
import {FlightrouteActions} from '../../../../flightroute/state/ngrx/flightroute.actions';
import {TrackActions} from '../../../../track/state/ngrx/track.actions';
import {Store} from '@ngrx/store';
import {AirportChartActions} from '../../../../aerodrome-charts/state/ngrx/airport-chart.actions';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@Component({
    selector: 'app-clear-dialog',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    templateUrl: './clear-dialog.component.html',
    styleUrls: ['./clear-dialog.component.scss']
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
