import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {FlightMapActions} from '../../../state/ngrx/flight-map.actions';
import {getFlightMapShowFullScreen} from '../../../state/ngrx/flight-map.selectors';
import {Observable} from 'rxjs';


@Component({
    selector: 'app-full-screen-button',
    templateUrl: './full-screen-button.component.html',
    styleUrls: ['./full-screen-button.component.scss']
})
export class FullScreenButtonComponent implements OnInit {
    public showFullScreen$: Observable<boolean> = this.appStore.pipe(select(getFlightMapShowFullScreen));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onButtonClicked() {
        this.appStore.dispatch(FlightMapActions.toggleFullScreen());
    }


    public getButtonStatusCLass(showFullScreen: boolean): string {
        return showFullScreen ? 'mapbutton-status-ok' : 'mapbutton-primary';
    }


    public getIconClass(showFullScreen: boolean): string {
        return showFullScreen ? 'fas fa-compress' : 'fas fa-expand';
    }
}
