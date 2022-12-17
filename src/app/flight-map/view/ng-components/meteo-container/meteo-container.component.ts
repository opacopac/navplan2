import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MeteoLayer} from '../../../domain/model/meteo-layer';
import {getFlightMapMeteoLayer} from '../../../state/ngrx/flight-map.selectors';
import {FlightMapActions} from '../../../state/ngrx/flight-map.actions';


@Component({
    selector: 'app-meteo-container',
    templateUrl: './meteo-container.component.html',
    styleUrls: ['./meteo-container.component.css']
})
export class MeteoContainerComponent implements OnInit, OnDestroy, AfterViewInit {
    private readonly meteoLayer$ = this.appStore.pipe(select(getFlightMapMeteoLayer));


    constructor(private readonly appStore: Store<any>) {
    }


    ngOnInit(): void {
    }


    ngAfterViewInit(): void {
    }


    ngOnDestroy(): void {
    }


    public getStationsButtonClass(): Observable<string> {
        return this.meteoLayer$.pipe(
            map(layer => this.getButtonCLass(layer === MeteoLayer.SmaStationsLayer))
        );
    }


    public getWeatherButtonClass(): Observable<string> {
        return this.meteoLayer$.pipe(
            map(layer => this.getButtonCLass(layer === MeteoLayer.DwdWeatherLayer))
        );
    }


    public getWindButtonClass(): Observable<string> {
        return this.meteoLayer$.pipe(
            map(layer => this.getButtonCLass(layer === MeteoLayer.DwdWindLayer))
        );
    }


    public getTimeLineClass(): Observable<string> {
        return this.meteoLayer$.pipe(
            map(layer => layer === MeteoLayer.SmaStationsLayer ? 'timeline-hide' : 'timeline-show')
        );
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


    private getButtonCLass(isSelected: boolean): string {
        return isSelected
            ? 'weather-button button-selected'
            : 'weather-button button-not-selected';
    }
}
