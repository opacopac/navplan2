import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getFlightMapMeteoLayer, getFlightMapShowMeteoLayer} from '../../../state/ngrx/flight-map.selectors';
import {FlightMapActions} from '../../../state/ngrx/flight-map.actions';
import {MeteoLayer} from '../../../domain/model/meteo-layer';
import {StatusButtonComponent} from '../../../../common/view/ng-components/status-button/status-button.component';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-meteo-button',
    imports: [
        CommonModule,
        StatusButtonComponent
    ],
    templateUrl: './meteo-button.component.html',
    styleUrls: ['./meteo-button.component.scss']
})
export class MeteoButtonComponent implements OnInit {
    public readonly showMeteoLayer$ = this.appStore.pipe(select(getFlightMapShowMeteoLayer));
    public readonly meteoLayer$ = this.appStore.pipe(select(getFlightMapMeteoLayer));
    protected readonly MeteoLayer = MeteoLayer;


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onMeteoButtonClicked() {
        this.appStore.dispatch(FlightMapActions.toggleMeteoLayer());
    }


    public onStationsSelected() {
        this.appStore.dispatch(FlightMapActions.selectMeteoLayer({meteoLayer: MeteoLayer.SmaStationsLayer}));
    }


    public onWeatherForecastSelected() {
        this.appStore.dispatch(FlightMapActions.selectMeteoLayer({meteoLayer: MeteoLayer.DwdWeatherLayer}));
    }


    public onWindForecastSelected() {
        this.appStore.dispatch(FlightMapActions.selectMeteoLayer({meteoLayer: MeteoLayer.DwdWindLayer}));
    }
}
