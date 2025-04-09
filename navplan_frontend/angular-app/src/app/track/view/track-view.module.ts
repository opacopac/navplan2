import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrackStateModule} from '../state/track-state.module';
import {TrackDomainModule} from '../domain/track-domain.module';
import {TrackRestModule} from '../rest/track-rest.module';
import {TrackListPageComponent} from './ng-components/track-list/track-list-page/track-list-page.component';
import {TrackListTableComponent} from './ng-components/track-list/track-list-table/track-list-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {CommonViewModule} from '../../common/view/common-view.module';
import {MatInputModule} from '@angular/material/input';
import {MatPaginator} from '@angular/material/paginator';
import {
    TrackDeleteConfirmDialogComponent
} from './ng-components/track-list/track-delete-confirm-dialog/track-delete-confirm-dialog.component';
import {
    TrackEditFormDialogComponent
} from './ng-components/track-list/track-edit-form-dialog/track-edit-form-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TrackTabsComponent} from './ng-components/track-tabs/track-tabs.component';
import {MatTabsModule} from '@angular/material/tabs';
import {TrackProfilePageComponent} from './ng-components/track-profile/track-profile-page/track-profile-page.component';
import {
    TrackProfileGraphComponent
} from './ng-components/track-profile/track-profile-graph/track-profile-graph.component';
import {TrackProfileTimesComponent} from './ng-components/track-profile/track-profile-times/track-profile-times.component';
import {ConfirmDeleteDialogComponent} from '../../common/view/ng-components/confirm-delete-dialog/confirm-delete-dialog.component';
import {FormDialogComponent} from '../../common/view/ng-components/form-dialog/form-dialog.component';


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
        CommonViewModule,
        TrackDomainModule,
        TrackRestModule,
        TrackStateModule,
        ConfirmDeleteDialogComponent,
        FormDialogComponent,
    ],
    declarations: [
        TrackTabsComponent,
        TrackListPageComponent,
        TrackListTableComponent,
        TrackEditFormDialogComponent,
        TrackDeleteConfirmDialogComponent,
        TrackProfilePageComponent,
        TrackProfileGraphComponent,
        TrackProfileTimesComponent
    ],
    exports: [
        TrackListPageComponent,
    ],
    providers: []
})
export class TrackViewModule {
}
