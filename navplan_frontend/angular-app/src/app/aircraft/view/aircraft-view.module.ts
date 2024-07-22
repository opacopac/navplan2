import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTab, MatTabContent, MatTabGroup, MatTabLabel} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {CommonViewModule} from '../../common/view/common-view.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {AircraftPageComponent} from './ng-components/aircraft-page/aircraft-page.component';
import {
    AircraftListContainerComponent
} from './ng-components/aircraft-list-container/aircraft-list-container.component';
import {
    AircraftDetailsContainerComponent
} from './ng-components/aircraft-details-container/aircraft-details-container.component';


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
        MatTab,
        MatTabGroup,
        MatTabLabel,
        MatTabContent,
    ],
    declarations: [
        AircraftPageComponent,
        AircraftListContainerComponent,
        AircraftDetailsContainerComponent
    ],
    exports: [],
    providers: []
})
export class AircraftViewModule {
}
