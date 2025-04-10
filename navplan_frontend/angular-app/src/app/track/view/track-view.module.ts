import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrackStateModule} from '../state/track-state.module';
import {TrackDomainModule} from '../domain/track-domain.module';
import {TrackListPageComponent} from '../../track-list/view/ng-components/track-list-page/track-list-page.component';
import {TrackListTableComponent} from '../../track-list/view/ng-components/track-list-table/track-list-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginator} from '@angular/material/paginator';
import {
    TrackDeleteConfirmDialogComponent
} from '../../track-list/view/ng-components/track-delete-confirm-dialog/track-delete-confirm-dialog.component';
import {TrackEditFormDialogComponent} from '../../track-list/view/ng-components/track-edit-form-dialog/track-edit-form-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TrackTabsComponent} from '../../track-tabs/view/ng-components/track-tabs/track-tabs.component';
import {MatTabsModule} from '@angular/material/tabs';
import {ConfirmDeleteDialogComponent} from '../../common/view/ng-components/confirm-delete-dialog/confirm-delete-dialog.component';
import {FormDialogComponent} from '../../common/view/ng-components/form-dialog/form-dialog.component';
import {IconButtonComponent} from '../../common/view/ng-components/icon-button/icon-button.component';
import {
    TableTextFilterAndCreateButtonComponent
} from '../../common/view/ng-components/table-filter-and-create-button/table-text-filter-and-create-button.component';
import {TrackProfilePageComponent} from '../../track-profile/view/ng-components/track-profile-page/track-profile-page.component';


@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatPaginator,
        MatTabsModule,
        ReactiveFormsModule,
        ConfirmDeleteDialogComponent,
        FormDialogComponent,
        IconButtonComponent,
        TableTextFilterAndCreateButtonComponent,
        TrackDomainModule,
        TrackStateModule,
        TrackProfilePageComponent,
    ],
    declarations: [
        TrackTabsComponent,
        TrackListPageComponent,
        TrackListTableComponent,
        TrackEditFormDialogComponent,
        TrackDeleteConfirmDialogComponent
    ],
    exports: [
        TrackListPageComponent,
    ],
    providers: []
})
export class TrackViewModule {
}
