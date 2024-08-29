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
import {AircraftWnbTableComponent} from './ng-components/aircraft-wnb-table/aircraft-wnb-table.component';
import {MatDialogModule} from '@angular/material/dialog';
import {
    AircraftPickerContainerComponent
} from './ng-components/aircraft-picker-container/aircraft-picker-container.component';
import {AircraftPickerComponent} from './ng-components/aircraft-picker/aircraft-picker.component';
import {
    AircraftWeightItemTypeIconComponent
} from './ng-components/aircraft-weight-item-type-icon/aircraft-weight-item-type-icon.component';
import {AircraftPickerDialogComponent} from './ng-components/aircraft-picker-dialog/aircraft-picker-dialog.component';
import {AircraftPickerListComponent} from './ng-components/aircraft-picker-list/aircraft-picker-list.component';
import {
    AircraftWnbEditEnvelopeComponent
} from './ng-components/aircraft-wnb-edit-envelope-container/aircraft-wnb-edit-envelope.component';
import {
    AircraftWnbEditEnvelopeCoordinateDialogComponent
} from './ng-components/aircraft-wnb-edit-envelope-coordinate-dialog/aircraft-wnb-edit-envelope-coordinate-dialog.component';
import {
    AircraftWnbEditEnvelopeCoordinateFormComponent
} from './ng-components/aircraft-wnb-edit-envelope-coordinate-form/aircraft-wnb-edit-envelope-coordinate-form.component';
import {
    AircraftWnbWeightFieldsComponent
} from './ng-components/aircraft-wnb-weight-fields/aircraft-wnb-weight-fields.component';
import {
    AircraftWnbEnvelopeListComponent
} from './ng-components/aircraft-wnb-envelope-list/aircraft-wnb-envelope-list.component';
import {
    AircraftWnbEnvelopeChartComponent
} from './ng-components/aircraft-wnb-envelope-chart/aircraft-wnb-envelope-chart.component';
import {
    AircraftWnbEditEnvelopeDefinitionFormComponent
} from './ng-components/aircraft-wnb-edit-envelope-definition-form/aircraft-wnb-edit-envelope-definition-form.component';
import {
    AircraftWnbEditEnvelopeDefinitionDialogComponent
} from './ng-components/aircraft-wnb-edit-envelope-definition-dialog/aircraft-wnb-edit-envelope-definition-dialog.component';


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
        AircraftPickerDialogComponent,
        AircraftPickerListComponent,
        AircraftPerformanceContainerComponent,
        AircraftPerformanceComponent,
        AircraftPerformanceTableComponent,
        AircraftPerformanceCorrectionFactorsComponent,
        AircraftWnbContainerComponent,
        AircraftWnbWeightFieldsComponent,
        AircraftWnbTableComponent,
        AircraftWnbEnvelopeListComponent,
        AircraftWnbEditItemDialogComponent,
        AircraftWnbEditItemFormComponent,
        AircraftWeightItemTypeIconComponent,
        AircraftWnbEnvelopeChartComponent,
        AircraftWnbEditEnvelopeComponent,
        AircraftWnbEditEnvelopeDefinitionDialogComponent,
        AircraftWnbEditEnvelopeDefinitionFormComponent,
        AircraftWnbEditEnvelopeCoordinateDialogComponent,
        AircraftWnbEditEnvelopeCoordinateFormComponent
    ],
    exports: [
        AircraftPickerContainerComponent,
        AircraftWeightItemTypeIconComponent,
        AircraftWnbEnvelopeChartComponent
    ],
    providers: []
})
export class AircraftViewModule {
}
