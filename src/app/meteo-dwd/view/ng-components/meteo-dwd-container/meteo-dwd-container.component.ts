import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';


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
}
