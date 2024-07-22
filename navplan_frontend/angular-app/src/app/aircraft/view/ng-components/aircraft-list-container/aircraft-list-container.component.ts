import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AircraftActions} from '../../../state/ngrx/aircraft.actions';
import {getAircraftList, getCurrentAircraft} from '../../../state/ngrx/aircraft.selectors';


@Component({
    selector: 'app-aircraft-list-container',
    templateUrl: './aircraft-list-container.component.html',
    styleUrls: ['./aircraft-list-container.component.scss'],
})
export class AircraftListContainerComponent implements OnInit {
    protected readonly aircraftList$ = this.appStore.pipe(select(getAircraftList));
    protected readonly currentAircraft$ = this.appStore.pipe(select(getCurrentAircraft));

    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
        this.appStore.dispatch(AircraftActions.readList());
    }


    protected onAircraftSelected(aircraftId: number) {
    }


    protected onAircraftDuplicated(aircraftId: number) {
    }


    protected onAircraftDeleted(aircraftId: number) {
    }
}
