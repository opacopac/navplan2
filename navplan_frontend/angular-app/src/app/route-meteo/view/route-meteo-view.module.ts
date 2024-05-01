import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouteMeteoContainerComponent} from './ng-components/route-meteo-container/route-meteo-container.component';
import {FlightrouteStateModule} from '../../flightroute/state/flightroute-state.module';
import {RouteMeteoStateModule} from '../state/route-meteo-state.module';
import {RouteMeteoDomainModule} from '../domain/route-meteo-domain.module';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {RouteMeteoTableComponent} from './ng-components/route-meteo-table/route-meteo-table.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
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
