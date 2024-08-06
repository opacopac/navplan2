import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AircraftCrudActions} from '../../../state/ngrx/aircraft-crud-actions';
import {getAircraftList, getCurrentAircraft} from '../../../state/ngrx/aircraft.selectors';
import {AircraftListActions} from '../../../state/ngrx/aircraft-list.actions';


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
        this.appStore.dispatch(AircraftListActions.readList());
    }


    protected onAircraftSelected(aircraftId: number) {
        this.appStore.dispatch(AircraftListActions.selectAircraft({aircraftId: aircraftId}));
    }


    protected onAircraftEdited(aircraftId: number) {
        this.appStore.dispatch(AircraftListActions.editAircraft({aircraftId: aircraftId}));
    }


    protected onAircraftDuplicated(aircraftId: number) {
        this.appStore.dispatch(AircraftCrudActions.duplicateAircraft({aircraftId: aircraftId}));
    }


    protected onAircraftDeleted(aircraftId: number) {
        this.appStore.dispatch(AircraftCrudActions.deleteAircraft({aircraftId: aircraftId}));
    }
}
