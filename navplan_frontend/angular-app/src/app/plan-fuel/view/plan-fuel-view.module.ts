import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonViewModule} from '../../common/view/common-view.module';
import {FuelCalcInputFieldsComponent} from './ng-components/fuel-calc-input-fields/fuel-calc-input-fields.component';
import {FuelCalcTableComponent} from './ng-components/fuel-calc-table/fuel-calc-table.component';
import {FuelCalcContainerComponent} from './ng-components/fuel-calc-container/fuel-calc-container.component';
import {MatFormField} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
    imports: [
        CommonModule,
        CommonViewModule,
        ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatCardModule,
        MatFormField,
        MatTable,
    ],
    declarations: [
        FuelCalcContainerComponent,
        FuelCalcTableComponent,
        FuelCalcInputFieldsComponent,
    ],
    exports: [
        FuelCalcContainerComponent
    ],
    providers: []
})
export class TrafficViewModule {
}
