import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapOverlayNotamTabComponent} from './ng-components/map-overlay-notam-tab/map-overlay-notam-tab.component';
import {NotamDomainModule} from '../domain/notam-domain.module';
import {NotamRestModule} from '../rest/notam-rest.module';
import {NotamStateModule} from '../state/notam-state.module';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        NotamDomainModule,
        NotamRestModule,
        NotamStateModule,
    ],
    declarations: [
        MapOverlayNotamTabComponent
    ],
    exports: [
        MapOverlayNotamTabComponent
    ],
    providers: [
    ]
})
export class NotamViewModule {}
