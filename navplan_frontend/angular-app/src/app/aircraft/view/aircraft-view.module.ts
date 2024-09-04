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
import {AircraftTabsComponent} from './ng-components/aircraft-tabs/aircraft-tabs.component';
import {
    AircraftHangarPageComponent
} from './ng-components/aircraft-hangar/aircraft-hangar-page/aircraft-hangar-page.component';
import {
    AircraftDetailsPageComponent
} from './ng-components/aircraft-details/aircraft-details-page/aircraft-details-page.component';
import {AircraftDomainModule} from '../domain/aircraft-domain.module';
import {AircraftRestModule} from '../rest/aircraft-rest.module';
import {AircraftStateModule} from '../state/aircraft-state.module';
import {AircraftListComponent} from './ng-components/aircraft-hangar/aircraft-list/aircraft-list.component';
import {
    AircraftDetailsFormComponent
} from './ng-components/aircraft-details/aircraft-details-form/aircraft-details-form.component';
import {MatRadioModule} from '@angular/material/radio';
import {
    AircraftPerformancePageComponent
} from './ng-components/aircraft-performance/aircraft-performance-page/aircraft-performance-page.component';
import {
    AircraftPerformanceAccordionComponent
} from './ng-components/aircraft-performance/aircraft-performance-accordion/aircraft-performance-accordion.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {
    AircraftPerformanceTableComponent
} from './ng-components/aircraft-performance/aircraft-performance-table/aircraft-performance-table.component';
import {
    AircraftPerformanceCorrectionFactorsComponent
} from './ng-components/aircraft-performance/aircraft-performance-correction-factors/aircraft-performance-correction-factors.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {AircraftWnbPageComponent} from './ng-components/aircraft-wnb/aircraft-wnb-page/aircraft-wnb-page.component';
import {
    AircraftWnbWeightItemTableComponent
} from './ng-components/aircraft-wnb/aircraft-wnb-weight-item-table/aircraft-wnb-weight-item-table.component';
import {MatDialogModule} from '@angular/material/dialog';
import {
    AircraftPickerContainerComponent
} from './ng-components/aircraft-common/aircraft-picker-container/aircraft-picker-container.component';
import {AircraftPickerComponent} from './ng-components/aircraft-common/aircraft-picker/aircraft-picker.component';
import {
    AircraftWeightItemTypeIconComponent
} from './ng-components/aircraft-wnb/aircraft-weight-item-type-icon/aircraft-weight-item-type-icon.component';
import {
    AircraftPickerDialogComponent
} from './ng-components/aircraft-common/aircraft-picker-dialog/aircraft-picker-dialog.component';
import {
    AircraftPickerListComponent
} from './ng-components/aircraft-common/aircraft-picker-list/aircraft-picker-list.component';
import {
    AircraftWnbEditEnvelopeComponent
} from './ng-components/aircraft-wnb/aircraft-wnb-edit-envelope-container/aircraft-wnb-edit-envelope.component';
import {
    AircraftWnbWeightFieldsComponent
} from './ng-components/aircraft-wnb/aircraft-wnb-weight-fields/aircraft-wnb-weight-fields.component';
import {
    AircraftWnbEnvelopeListComponent
} from './ng-components/aircraft-wnb/aircraft-wnb-envelope-list/aircraft-wnb-envelope-list.component';
import {
    AircraftWnbEnvelopeChartComponent
} from './ng-components/aircraft-wnb/aircraft-wnb-envelope-chart/aircraft-wnb-envelope-chart.component';
import {
    AircraftWnbEditEnvelopeDefinitionFormDialogComponent
} from './ng-components/aircraft-wnb/aircraft-wnb-edit-envelope-definition-form-dialog/aircraft-wnb-edit-envelope-definition-form-dialog.component';
import {
    AircraftWnbEditEnvelopeCoordinateFormDialogComponent
} from './ng-components/aircraft-wnb/aircraft-wnb-edit-envelope-coordinate-form-dialog/aircraft-wnb-edit-envelope-coordinate-form-dialog.component';
import {
    AircraftWnbEditWeightItemFormDialogComponent
} from './ng-components/aircraft-wnb/aircraft-wnb-edit-weight-item-form-dialog/aircraft-wnb-edit-weight-item-form-dialog.component';
import {
    AircraftCreateFormDialogComponent
} from './ng-components/aircraft-hangar/aircraft-create-form-dialog/aircraft-create-form-dialog.component';
import {
    AircraftDeleteConfirmDialogComponent
} from './ng-components/aircraft-hangar/aircraft-delete-confirm-dialog/aircraft-delete-confirm-dialog.component';


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
        AircraftTabsComponent,
        AircraftHangarPageComponent,
        AircraftListComponent,
        AircraftCreateFormDialogComponent,
        AircraftDeleteConfirmDialogComponent,
        AircraftDetailsPageComponent,
        AircraftDetailsFormComponent,
        AircraftPickerContainerComponent,
        AircraftPickerComponent,
        AircraftPickerDialogComponent,
        AircraftPickerListComponent,
        AircraftPerformancePageComponent,
        AircraftPerformanceAccordionComponent,
        AircraftPerformanceTableComponent,
        AircraftPerformanceCorrectionFactorsComponent,
        AircraftWnbPageComponent,
        AircraftWnbWeightFieldsComponent,
        AircraftWnbWeightItemTableComponent,
        AircraftWnbEnvelopeListComponent,
        AircraftWnbEditWeightItemFormDialogComponent,
        AircraftWeightItemTypeIconComponent,
        AircraftWnbEnvelopeChartComponent,
        AircraftWnbEditEnvelopeComponent,
        AircraftWnbEditEnvelopeCoordinateFormDialogComponent,
        AircraftWnbEditEnvelopeDefinitionFormDialogComponent
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
