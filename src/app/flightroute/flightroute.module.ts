import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {SharedModule} from '../shared/shared.module';
import {FlightrouteService} from './services/flightroute/flightroute.service';
import {EditWaypointDialogComponent} from './components/edit-waypoint-dialog/edit-waypoint-dialog.component';
import {EditWaypointFormComponent} from './components/edit-waypoint-form/edit-waypoint-form.component';
import {FlightrouteContainerComponent} from './components/flightroute-container/flightroute-container.component';
import {FuelCalcTableComponent} from './components/fuel-calc-table/fuel-calc-table.component';
import {WaypointListComponent} from './components/waypoint-list/waypoint-list.component';
import {FlightrouteExportButtonsComponent} from './components/flightroute-export-buttons/flightroute-export-buttons.component';
import {flightrouteReducer} from './flightroute.reducer';
import {FlightrouteEffects} from './flightroute.effects';
import {BaseMapModule} from '../base-map/base-map.module';
import {MapFeaturesModule} from '../map-features/map-features.module';
import {FuelCalcContainerComponent} from './components/fuel-calc-container/fuel-calc-container.component';
import {FlightroutePageComponent} from './components/flightroute-page/flightroute-page.component';
import {FlightrouteListDialogComponent} from './components/flightroute-list-dialog/flightroute-list-dialog.component';
import {FlightrouteListComponent} from './components/flightroute-list/flightroute-list.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('flightrouteState', flightrouteReducer),
        EffectsModule.forFeature([FlightrouteEffects]),
        DragDropModule,
        SharedModule,
        BaseMapModule,
        MapFeaturesModule,
    ],
    declarations: [
        EditWaypointDialogComponent,
        EditWaypointFormComponent,
        FlightrouteContainerComponent,
        FlightrouteExportButtonsComponent,
        FuelCalcTableComponent,
        WaypointListComponent,
        FuelCalcContainerComponent,
        FlightroutePageComponent,
        FlightrouteListDialogComponent,
        FlightrouteListComponent,
    ],
    exports: [
        FlightroutePageComponent,
        EditWaypointDialogComponent,
    ],
    providers: [
        FlightrouteService
    ],
    entryComponents: [
        EditWaypointDialogComponent,
        FlightrouteListDialogComponent
    ],
})
export class FlightrouteModule {}
