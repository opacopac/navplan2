import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {MeteoDwdActions} from '../../../state/ngrx/meteo-dwd.actions';


@Component({
    selector: 'app-meteo-dwd-container',
    templateUrl: './meteo-dwd-container.component.html',
    styleUrls: ['./meteo-dwd-container.component.css']
})
export class MeteoDwdContainerComponent implements OnInit, OnDestroy, AfterViewInit {
    constructor(private appStore: Store<any>) {
    }


    ngOnInit(): void {
    }


    ngAfterViewInit(): void {
    }


    ngOnDestroy(): void {
    }


    public onWeatherForecastSelected() {
        this.appStore.dispatch(MeteoDwdActions.selectWeatherForecast());
    }


    public onWindForecastSelected() {
        this.appStore.dispatch(MeteoDwdActions.selectWindForecast());
    }
}
