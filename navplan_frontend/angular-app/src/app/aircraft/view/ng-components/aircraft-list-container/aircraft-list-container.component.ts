import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AircraftActions} from '../../../state/ngrx/aircraft.actions';


@Component({
    selector: 'app-aircraft-list-container',
    templateUrl: './aircraft-list-container.component.html',
    styleUrls: ['./aircraft-list-container.component.scss'],
})
export class AircraftListContainerComponent implements OnInit {
    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
        this.appStore.dispatch(AircraftActions.readList());
    }
}
