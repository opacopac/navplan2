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
import {FuelCalcTableComponent} from './components/fuel-calc-table/fuel-calc-table.component';
import {WaypointListComponent} from './components/waypoint-list/waypoint-list.component';
import {FlightrouteExportButtonsComponent} from './components/flightroute-export-buttons/flightroute-export-buttons.component';
import {flightrouteReducer} from './flightroute.reducer';
import {FlightrouteEffects} from './flightroute.effects';
import {
    MatButtonToggleModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule
} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {BaseMapModule} from '../base-map/base-map.module';
import {MapFeaturesModule} from '../map-features/map-features.module';
import { FuelCalcContainerComponent } from './components/fuel-calc-container/fuel-calc-container.component';
import { FlightroutePageComponent } from './components/flightroute-page/flightroute-page.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
        DragDropModule,
        SharedModule,
        BaseMapModule,
        MapFeaturesModule,
    ],
    declarations: [
        EditWaypointContainerComponent,
        EditWaypointDialogComponent,
        FlightrouteContainerComponent,
        FlightrouteExportButtonsComponent,
        FuelCalcTableComponent,
        WaypointListComponent,
        FuelCalcContainerComponent,
        FlightroutePageComponent,
    ],
    exports: [
        FlightroutePageComponent,
        EditWaypointContainerComponent,
    ],
    providers: [
        FlightrouteService
    ],
    entryComponents: [
        EditWaypointDialogComponent
    ],
})
export class FlightrouteModule {}
