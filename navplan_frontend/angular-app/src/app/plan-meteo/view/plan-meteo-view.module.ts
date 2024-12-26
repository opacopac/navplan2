import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonViewModule} from '../../common/view/common-view.module';
import {RouteMeteoContainerComponent} from './ng-components/route-meteo-container/route-meteo-container.component';
import {RouteMeteoTableComponent} from './ng-components/route-meteo-table/route-meteo-table.component';
import {RouteMeteoRadiusComponent} from './ng-components/route-meteo-radius/route-meteo-radius.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MetarTafViewModule} from '../../metar-taf/view/metar-taf-view.module';


@NgModule({
    imports: [
        CommonModule,
        CommonViewModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTableModule,
        MetarTafViewModule,
    ],
    declarations: [
        RouteMeteoContainerComponent,
        RouteMeteoTableComponent,
        RouteMeteoRadiusComponent
    ],
    exports: [
        RouteMeteoContainerComponent
    ],
    providers: []
})
export class PlanMeteoViewModule {
}
