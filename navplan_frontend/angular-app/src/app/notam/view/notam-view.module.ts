import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapPopupNotamTabComponent} from './ng-components/map-popup-notam-tab/map-popup-notam-tab.component';
import {NotamDomainModule} from '../domain/notam-domain.module';
import {NotamRestModule} from '../rest/notam-rest.module';
import {NotamStateModule} from '../state/notam-state.module';
import {MatTableModule} from '@angular/material/table';
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
        MapPopupNotamTabComponent
    ],
    exports: [
        MapPopupNotamTabComponent
    ],
    providers: [
    ]
})
export class NotamViewModule {}
