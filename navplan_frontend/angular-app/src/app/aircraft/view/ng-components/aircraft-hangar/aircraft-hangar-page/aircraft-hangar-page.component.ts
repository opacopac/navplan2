import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AircraftCrudActions} from '../../../../state/ngrx/aircraft-crud.actions';
import {getAcTableState, getAircraftList, getCurrentAircraft} from '../../../../state/ngrx/aircraft.selectors';
import {AircraftListActions} from '../../../../state/ngrx/aircraft-list.actions';
import {getConsumptionUnit, getHorizontalSpeedUnit} from '../../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {Aircraft} from '../../../../domain/model/aircraft';
import {TableState} from '../../../../../common/state/model/table-state';
import {AircraftHangarTableComponent} from '../aircraft-hangar-table/aircraft-hangar-table.component';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-aircraft-hangar-page',
    imports: [
        CommonModule,
        AircraftHangarTableComponent
    ],
    templateUrl: './aircraft-hangar-page.component.html',
    styleUrls: ['./aircraft-hangar-page.component.scss']
})
export class AircraftHangarPageComponent implements OnInit {
    protected readonly aircraftList$ = this.appStore.pipe(select(getAircraftList));
    protected readonly currentAircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly horizontalSpeedUnit$ = this.appStore.pipe(select(getHorizontalSpeedUnit));
    protected readonly consumptionUnit$ = this.appStore.pipe(select(getConsumptionUnit));
    protected readonly tableState$ = this.appStore.pipe(select(getAcTableState));

    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
        this.appStore.dispatch(AircraftListActions.readList());
    }


    protected onCreateNewAircraft(aircraft: Aircraft) {
        this.appStore.dispatch(AircraftCrudActions.createNewAircraft({aircraft: aircraft}));
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


    protected onTableStateChanged(tableState: TableState) {
        this.appStore.dispatch(AircraftListActions.updateTableState({tableState: tableState}));
    }
}
