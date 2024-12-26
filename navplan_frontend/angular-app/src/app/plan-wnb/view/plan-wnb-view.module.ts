import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonViewModule} from '../../common/view/common-view.module';
import {AircraftViewModule} from '../../aircraft/view/aircraft-view.module';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {PlanWnbContainerComponent} from './ng-components/plan-wnb-container/plan-wnb-container.component';
import {PlanWnbTableComponent} from './ng-components/plan-wnb-table/plan-wnb-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';


@NgModule({
    imports: [
        CommonModule,
        CommonViewModule,
        AircraftViewModule,
        MatRadioModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatAccordion,
        MatExpansionModule,
        MatTableModule,
        MatInputModule
    ],
    declarations: [
        PlanWnbContainerComponent,
        PlanWnbTableComponent
    ],
    exports: [
        PlanWnbContainerComponent
    ],
    providers: []
})
export class PlanWnbViewModule {
}
