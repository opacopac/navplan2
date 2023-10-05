import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MeteoLayer} from '../../../domain/model/meteo-layer';
import {getFlightMapMeteoLayer} from '../../../state/ngrx/flight-map.selectors';


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


    public getTimeLineClass(): Observable<string> {
        return this.meteoLayer$.pipe(
            map(layer => layer === MeteoLayer.SmaStationsLayer ? 'timeline-hide' : 'timeline-show')
        );
    }
}
