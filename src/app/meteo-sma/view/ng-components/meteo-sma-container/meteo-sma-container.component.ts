import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';


@Component({
    selector: 'app-meteo-sma-container',
    templateUrl: './meteo-sma-container.component.html',
    styleUrls: ['./meteo-sma-container.component.css']
})
export class MeteoSmaContainerComponent implements OnInit, OnDestroy, AfterViewInit {
    constructor(private appStore: Store<any>) {
    }


    ngOnInit(): void {
    }


    ngAfterViewInit(): void {
    }


    ngOnDestroy(): void {
    }
}
