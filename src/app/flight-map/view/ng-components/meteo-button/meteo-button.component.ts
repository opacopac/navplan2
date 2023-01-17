import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getFlightMapMeteoLayer, getFlightMapShowMeteoLayer} from '../../../state/ngrx/flight-map.selectors';
import {FlightMapActions} from '../../../state/ngrx/flight-map.actions';
import {MeteoLayer} from '../../../domain/model/meteo-layer';


@Component({
    selector: 'app-meteo-button',
    templateUrl: './meteo-button.component.html',
    styleUrls: ['./meteo-button.component.css']
})
export class MeteoButtonComponent implements OnInit {
    public readonly showMeteoLayer$ = this.appStore.pipe(select(getFlightMapShowMeteoLayer));
    public readonly meteoLayer$ = this.appStore.pipe(select(getFlightMapMeteoLayer));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onMeteoButtonClicked() {
        this.appStore.dispatch(FlightMapActions.toggleMeteoLayer());
    }


    public getMeteoButtonStatusCLass(showMeteoLayer: boolean): string {
        return showMeteoLayer ? 'mapbutton-status-ok' : 'mapbutton-primary';
    }


    public getStationsButtonClass(layer: MeteoLayer): string {
        return layer === MeteoLayer.SmaStationsLayer ? 'mapbutton-status-ok' : 'mapbutton-primary';
    }


    public getWeatherButtonClass(layer: MeteoLayer): string {
        return layer === MeteoLayer.DwdWeatherLayer ? 'mapbutton-status-ok' : 'mapbutton-primary';
    }


    public getWindButtonClass(layer: MeteoLayer): string {
        return layer === MeteoLayer.DwdWindLayer ? 'mapbutton-status-ok' : 'mapbutton-primary';
    }


    public onStationsSelected() {
        this.appStore.dispatch(FlightMapActions.selectMeteoLayer({ meteoLayer: MeteoLayer.SmaStationsLayer }));
    }


    public onWeatherForecastSelected() {
        this.appStore.dispatch(FlightMapActions.selectMeteoLayer({ meteoLayer: MeteoLayer.DwdWeatherLayer }));
    }


    public onWindForecastSelected() {
        this.appStore.dispatch(FlightMapActions.selectMeteoLayer({ meteoLayer: MeteoLayer.DwdWindLayer }));
    }
}
