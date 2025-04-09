import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanMeteoContainerComponent} from './ng-components/plan-meteo-container/plan-meteo-container.component';
import {PlanMeteoTableComponent} from './ng-components/plan-meteo-table/plan-meteo-table.component';
import {PlanMeteoRadiusComponent} from './ng-components/plan-meteo-radius/plan-meteo-radius.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MetarTafViewModule} from '../../metar-taf/view/metar-taf-view.module';
import {PlanMeteoDomainModule} from '../domain/plan-meteo-domain.module';
import {PlanMeteoStateModule} from '../state/plan-meteo-state.module';
import {PlanRouteListViewModule} from '../../plan-route-list/view/plan-route-list-view.module';
import {MapPopupMetarTafComponent} from '../../metar-taf/view/ng-components/map-popup-metar-taf/map-popup-metar-taf.component';
import {MetarTafStateModule} from '../../metar-taf/state/metar-taf-state.module';


@NgModule({
    imports: [
        CommonModule,
        PlanMeteoDomainModule,
        PlanMeteoStateModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTableModule,
        MetarTafViewModule,
        MetarTafStateModule,
        PlanRouteListViewModule,
        MapPopupMetarTafComponent,
    ],
    declarations: [
        PlanMeteoContainerComponent,
        PlanMeteoTableComponent,
        PlanMeteoRadiusComponent
    ],
    exports: [
        PlanMeteoContainerComponent
    ],
    providers: []
})
export class PlanMeteoViewModule {
}
