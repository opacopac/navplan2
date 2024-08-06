import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
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
import {AircraftDomainModule} from '../domain/aircraft-domain.module';
import {AircraftRestModule} from '../rest/aircraft-rest.module';
import {AircraftStateModule} from '../state/aircraft-state.module';
import {AircraftListComponent} from './ng-components/aircraft-list/aircraft-list.component';
import {AircraftDetailsComponent} from './ng-components/aircraft-details/aircraft-details.component';
import {MatRadioModule} from '@angular/material/radio';
import {
    AircraftPerformanceContainerComponent
} from './ng-components/aircraft-performance-container/aircraft-performance-container.component';
import {AircraftPerformanceComponent} from './ng-components/aircraft-performance/aircraft-performance.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {
    AircraftPerformanceTableComponent
} from './ng-components/aircraft-performance-table/aircraft-performance-table.component';
import {
    AircraftPerformanceCorrectionFactorsComponent
} from './ng-components/aircraft-performance-correction-factors/aircraft-performance-correction-factors.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {
    AircraftWnbEditItemDialogComponent
} from './ng-components/aircraft-wnb-edit-item-dialog/aircraft-wnb-edit-item-dialog.component';
import {
    AircraftWnbEditItemFormComponent
} from './ng-components/aircraft-wnb-edit-item-form/aircraft-wnb-edit-item-form.component';
import {AircraftWnbContainerComponent} from './ng-components/aircraft-wnb-container/aircraft-wnb-container.component';
import {AircraftWnbComponent} from './ng-components/aircraft-wnb/aircraft-wnb.component';
import {AircraftWnbTableComponent} from './ng-components/aircraft-wnb-table/aircraft-wnb-table.component';
import {MatDialogModule} from '@angular/material/dialog';
import {
    AircraftPickerContainerComponent
} from './ng-components/aircraft-picker-container/aircraft-picker-container.component';
import {AircraftPickerComponent} from './ng-components/aircraft-picker/aircraft-picker.component';


@NgModule({
    imports: [
        CommonModule,
        CommonViewModule,
        ReactiveFormsModule,
        AircraftDomainModule,
        AircraftRestModule,
        AircraftStateModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatCardModule,
        MatTabsModule,
        MatRadioModule,
        MatExpansionModule,
        MatGridListModule,
        MatDialogModule,
    ],
    declarations: [
        AircraftPageComponent,
        AircraftListContainerComponent,
        AircraftListComponent,
        AircraftDetailsContainerComponent,
        AircraftDetailsComponent,
        AircraftPickerContainerComponent,
        AircraftPickerComponent,
        AircraftPerformanceContainerComponent,
        AircraftPerformanceComponent,
        AircraftPerformanceTableComponent,
        AircraftPerformanceCorrectionFactorsComponent,
        AircraftWnbContainerComponent,
        AircraftWnbComponent,
        AircraftWnbTableComponent,
        AircraftWnbEditItemDialogComponent,
        AircraftWnbEditItemFormComponent,
    ],
    exports: [],
    providers: []
})
export class AircraftViewModule {
}
