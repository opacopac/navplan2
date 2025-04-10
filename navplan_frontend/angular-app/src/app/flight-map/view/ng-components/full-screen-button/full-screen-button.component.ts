import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {FlightMapActions} from '../../../state/ngrx/flight-map.actions';
import {getFlightMapShowFullScreen} from '../../../state/ngrx/flight-map.selectors';
import {Observable} from 'rxjs';
import {StatusButtonComponent} from '../../../../common/view/ng-components/status-button/status-button.component';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-full-screen-button',
    standalone: true,
    imports: [
        CommonModule,
        StatusButtonComponent
    ],
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


    public getIconClass(showFullScreen: boolean): string {
        return showFullScreen ? 'fas fa-compress' : 'fas fa-expand';
    }
}
