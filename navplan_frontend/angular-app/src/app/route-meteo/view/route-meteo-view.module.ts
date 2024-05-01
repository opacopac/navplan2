import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouteMeteoContainerComponent} from './ng-components/route-meteo-container/route-meteo-container.component';
import {FlightrouteStateModule} from '../../flightroute/state/flightroute-state.module';
import {RouteMeteoStateModule} from '../state/route-meteo-state.module';
import {RouteMeteoDomainModule} from '../domain/route-meteo-domain.module';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {RouteMeteoTableComponent} from './ng-components/route-meteo-table/route-meteo-table.component';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {ReactiveFormsModule} from '@angular/forms';
import {MetarTafViewModule} from '../../metar-taf/view/metar-taf-view.module';


@NgModule({
    imports: [
        CommonModule,
        RouteMeteoDomainModule,
        RouteMeteoStateModule,
        FlightrouteStateModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MetarTafViewModule,
    ],
    declarations: [
        RouteMeteoContainerComponent,
        RouteMeteoTableComponent
    ],
    exports: [
        RouteMeteoContainerComponent
    ],
    providers: [],
    entryComponents: [],
})
export class RouteMeteoViewModule {
}
