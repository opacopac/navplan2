import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getFlightMapShowMeteoLayer} from '../../../state/ngrx/flight-map.selectors';
import {FlightMapActions} from '../../../state/ngrx/flight-map.actions';


@Component({
    selector: 'app-meteo-button',
    templateUrl: './meteo-button.component.html',
    styleUrls: ['./meteo-button.component.css']
})
export class MeteoButtonComponent implements OnInit {
    public showMeteoLayer$ = this.appStore.pipe(select(getFlightMapShowMeteoLayer));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onMeteoButtonClicked() {
        this.appStore.dispatch(FlightMapActions.toggleMeteoLayer());
    }


    public getStatusCLass(showMeteoLayer: boolean): string {
        return showMeteoLayer ? 'mapoverlay-status-ok' : 'mapoverlay-primary';
    }
}
