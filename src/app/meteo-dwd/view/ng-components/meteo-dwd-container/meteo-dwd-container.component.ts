import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {MeteoDwdActions} from '../../../state/ngrx/meteo-dwd.actions';
import {getMeteoDwdLayer} from '../../../state/ngrx/meteo-dwd.selectors';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MeteoDwdLayer} from '../../../domain/model/meteo-dwd-layer';
import {environment} from '../../../../../environments/environment';


@Component({
    selector: 'app-meteo-dwd-container',
    templateUrl: './meteo-dwd-container.component.html',
    styleUrls: ['./meteo-dwd-container.component.css']
})
export class MeteoDwdContainerComponent implements OnInit, OnDestroy, AfterViewInit {
    private readonly meteoDwdLayer$ = this.appStore.pipe(select(getMeteoDwdLayer));
    public readonly windSockIconUrl = environment.iconBaseUrl + 'windsock.svg';


    constructor(private readonly appStore: Store<any>) {
    }


    ngOnInit(): void {
    }


    ngAfterViewInit(): void {
    }


    ngOnDestroy(): void {
    }


    public getStationsButtonClass(): Observable<string> {
        return this.meteoDwdLayer$.pipe(
            map(layer => this.getButtonCLass(false))
        );
    }


    public getWeatherButtonClass(): Observable<string> {
        return this.meteoDwdLayer$.pipe(
            map(layer => this.getButtonCLass(layer === MeteoDwdLayer.WeatherLayer))
        );
    }


    public getWindButtonClass(): Observable<string> {
        return this.meteoDwdLayer$.pipe(
            map(layer => this.getButtonCLass(layer === MeteoDwdLayer.WindLayer))
        );
    }


    public onWeatherForecastSelected() {
        this.appStore.dispatch(MeteoDwdActions.selectWeatherForecast());
    }


    public onWindForecastSelected() {
        this.appStore.dispatch(MeteoDwdActions.selectWindForecast());
    }


    private getButtonCLass(isSelected: boolean): string {
        return isSelected
            ? 'weather-button button-selected'
            : 'weather-button button-not-selected';
    }
}
