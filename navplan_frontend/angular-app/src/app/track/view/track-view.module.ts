import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrackStateModule} from '../state/track-state.module';
import {TrackDomainModule} from '../domain/track-domain.module';
import {TrackRestModule} from '../rest/track-rest.module';
import {TracksPageComponent} from './ng-components/track-list/tracks-page/tracks-page.component';
import {TrackListComponent} from './ng-components/track-list/track-list/track-list.component';
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
import {TrackEditFormDialogComponent} from './ng-components/track-list/track-edit-form-dialog/track-edit-form-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TrackTabsComponent} from './ng-components/track-tabs/track-tabs.component';
import {MatTabGroup, MatTabsModule} from '@angular/material/tabs';


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
    ],
    declarations: [
        TracksPageComponent,
        TrackTabsComponent,
        TrackListComponent,
        TrackEditFormDialogComponent,
        TrackDeleteConfirmDialogComponent
    ],
    exports: [
        TracksPageComponent,
    ],
    providers: []
})
export class TrackViewModule {
}
