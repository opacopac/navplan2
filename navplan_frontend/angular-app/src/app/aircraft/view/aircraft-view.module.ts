import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {AircraftTabsComponent} from './ng-components/aircraft-tabs/aircraft-tabs.component';
import {AircraftHangarPageComponent} from './ng-components/aircraft-hangar/aircraft-hangar-page/aircraft-hangar-page.component';
import {AircraftDetailsPageComponent} from './ng-components/aircraft-details/aircraft-details-page/aircraft-details-page.component';
import {AircraftDomainModule} from '../domain/aircraft-domain.module';
import {AircraftRestModule} from '../rest/aircraft-rest.module';
import {AircraftStateModule} from '../state/aircraft-state.module';
import {AircraftHangarTableComponent} from './ng-components/aircraft-hangar/aircraft-hangar-table/aircraft-hangar-table.component';
import {AircraftDetailsFormComponent} from './ng-components/aircraft-details/aircraft-details-form/aircraft-details-form.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {
    AircraftCreateFormDialogComponent
} from './ng-components/aircraft-hangar/aircraft-create-form-dialog/aircraft-create-form-dialog.component';
import {
    AircraftDeleteConfirmDialogComponent
} from './ng-components/aircraft-hangar/aircraft-delete-confirm-dialog/aircraft-delete-confirm-dialog.component';
import {
    AircraftTypeDesignatorAutocompleteComponent
} from './ng-components/aircraft-details/aircraft-type-designator-autocomplete/aircraft-type-designator-autocomplete.component';
import {AircraftManualToggle} from './ng-components/aircraft-manual-toggle/aircraft-manual-toggle.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIcon} from '@angular/material/icon';
import {AutoCompleteComponent} from '../../common/view/ng-components/auto-complete/auto-complete.component';
import {ConfirmDeleteDialogComponent} from '../../common/view/ng-components/confirm-delete-dialog/confirm-delete-dialog.component';
import {FormDialogComponent} from '../../common/view/ng-components/form-dialog/form-dialog.component';
import {IconButtonComponent} from '../../common/view/ng-components/icon-button/icon-button.component';
import {SaveButtonComponent} from '../../common/view/ng-components/save-button/save-button.component';
import {
    TableTextFilterAndCreateButtonComponent
} from '../../common/view/ng-components/table-filter-and-create-button/table-text-filter-and-create-button.component';
import {AircraftPerformanceViewModule} from '../../aircraft-performance/view/aircraft-performance-view.module';
import {
    AircraftPerformancePageComponent
} from '../../aircraft-performance/view/ng-components/aircraft-performance-page/aircraft-performance-page.component';
import {
    AircraftPickerContainerComponent
} from './ng-components/aircraft-common/aircraft-picker-container/aircraft-picker-container.component';
import {AircraftWnbViewModule} from '../../aircraft-wnb/view/aircraft-wnb-view.module';
import {AircraftWnbPageComponent} from '../../aircraft-wnb/view/ng-components/aircraft-wnb-page/aircraft-wnb-page.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AircraftDomainModule,
        AircraftRestModule,
        AircraftStateModule,
        AircraftPerformanceViewModule,
        AircraftWnbViewModule,
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
        MatSlideToggleModule,
        MatIcon,
        AutoCompleteComponent,
        ConfirmDeleteDialogComponent,
        FormDialogComponent,
        IconButtonComponent,
        SaveButtonComponent,
        TableTextFilterAndCreateButtonComponent,
        AircraftPerformancePageComponent,
        AircraftPickerContainerComponent,
        AircraftWnbPageComponent,
    ],
    declarations: [
        AircraftTabsComponent,
        AircraftHangarPageComponent,
        AircraftHangarTableComponent,
        AircraftCreateFormDialogComponent,
        AircraftDeleteConfirmDialogComponent,
        AircraftDetailsPageComponent,
        AircraftDetailsFormComponent,
        AircraftTypeDesignatorAutocompleteComponent,
        AircraftManualToggle
    ],
    exports: [
        AircraftManualToggle,
    ],
    providers: []
})
export class AircraftViewModule {
}
