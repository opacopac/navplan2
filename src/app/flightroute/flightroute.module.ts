import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../shared/shared.module';
import {FlightrouteService} from './services/flightroute/flightroute.service';
import {EditWaypointContainerComponent} from './components/edit-waypoint-container/edit-waypoint-container.component';
import {EditWaypointDialogComponent} from './components/edit-waypoint-dialog/edit-waypoint-dialog.component';
import {FlightrouteContainerComponent} from './components/flightroute-container/flightroute-container.component';
import {FlightrouteFormComponent} from './components/flightroute-form/flightroute-form.component';
import {FuelCalculationComponent} from './components/fuel-calculation/fuel-calculation.component';
import {WaypointListComponent} from './components/waypoint-list/waypoint-list.component';
import {WaypointListEntryComponent} from './components/waypoint-list-entry/waypoint-list-entry.component';
import {FlightrouteExportButtonsComponent} from './components/flightroute-export-buttons/flightroute-export-buttons.component';
import {MapOverlayButtonEditUserpointComponent} from './components/map-overlay-button-edit-userpoint/map-overlay-button-edit-userpoint.component';
import {MapOverlayButtonEditWaypointComponent} from './components/map-overlay-button-edit-waypoint/map-overlay-button-edit-waypoint.component';
import {MapOverlayButtonSetAlternateComponent} from './components/map-overlay-button-set-alternate/map-overlay-button-set-alternate.component';
import {MapOverlayButtonRemoveAlternateComponent} from './components/map-overlay-button-remove-alternate/map-overlay-button-remove-alternate.component';
import {MapOverlayButtonRemoveFromRouteComponent} from './components/map-overlay-button-remove-from-route/map-overlay-button-remove-from-route.component';
import {MapOverlayWaypointComponent} from './components/map-overlay-waypoint/map-overlay-waypoint.component';
import {flightrouteReducer} from './flightroute.reducer';
import {FlightrouteEffects} from './flightroute.effects';
import {MapOverlayButtonAddToRouteComponent} from './components/map-overlay-button-add-to-route/map-overlay-button-add-to-route.component';
import {
    MatButtonToggleModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule
} from '@angular/material';
import {MatInputModule} from '@angular/material/input';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        StoreModule.forFeature('flightrouteState', flightrouteReducer),
        EffectsModule.forFeature([FlightrouteEffects]),
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatTableModule,
        MatButtonToggleModule,
        MatDialogModule,
    ],
    declarations: [
        EditWaypointContainerComponent,
        EditWaypointDialogComponent,
        FlightrouteContainerComponent,
        FlightrouteExportButtonsComponent,
        FlightrouteFormComponent,
        FuelCalculationComponent,
        MapOverlayButtonAddToRouteComponent,
        MapOverlayButtonEditUserpointComponent,
        MapOverlayButtonEditWaypointComponent,
        MapOverlayButtonRemoveAlternateComponent,
        MapOverlayButtonRemoveFromRouteComponent,
        MapOverlayButtonSetAlternateComponent,
        MapOverlayWaypointComponent,
        WaypointListComponent,
        WaypointListEntryComponent
    ],
    exports: [
        EditWaypointContainerComponent,
        MapOverlayButtonAddToRouteComponent,
        MapOverlayButtonEditUserpointComponent,
        MapOverlayButtonEditWaypointComponent,
        MapOverlayButtonRemoveAlternateComponent,
        MapOverlayButtonRemoveFromRouteComponent,
        MapOverlayButtonSetAlternateComponent,
        MapOverlayWaypointComponent,
    ],
    providers: [
        FlightrouteService
    ],
    entryComponents: [
        EditWaypointDialogComponent
    ],
})
export class FlightrouteModule {}
