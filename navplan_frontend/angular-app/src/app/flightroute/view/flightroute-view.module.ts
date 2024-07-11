import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlightrouteStateModule} from '../state/flightroute-state.module';
import {FlightrouteDomainModule} from '../domain/flightroute-domain.module';
import {FlightrouteRestModule} from '../rest/flightroute-rest.module';
import {EditWaypointDialogComponent} from './ng-components/edit-waypoint-dialog/edit-waypoint-dialog.component';
import {EditWaypointFormComponent} from './ng-components/edit-waypoint-form/edit-waypoint-form.component';
import {GeoPhysicsViewModule} from '../../geo-physics/view/geo-physics-view.module';
import {CommonViewModule} from '../../common/view/common-view.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatError, MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';


@NgModule({
    imports: [
        CommonModule,
        CommonViewModule,
        FlightrouteDomainModule,
        FlightrouteRestModule,
        FlightrouteStateModule,
        GeoPhysicsViewModule,
        ReactiveFormsModule,
        MatFormField,
        MatButtonToggleGroup,
        MatButtonToggle,
        MatInput,
        MatSuffix,
        MatLabel,
        MatError,
        MatButton,
    ],
    declarations: [
        EditWaypointDialogComponent,
        EditWaypointFormComponent,
    ],
    exports: [],
    providers: []
})
export class FlightrouteViewModule {
}
