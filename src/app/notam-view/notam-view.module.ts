import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapOverlayNotamTabComponent} from './ng-components/map-overlay-notam-tab/map-overlay-notam-tab.component';
import {NotamModule} from '../notam/notam.module';
import {NotamRestModule} from '../notam-rest/notam-rest.module';
import {NotamStateModule} from '../notam-state/notam-state.module';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        NotamModule,
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
