import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MeteoDwdDomainModule} from '../domain/meteo-dwd-domain.module';
import {MeteoDwdButtonComponent} from './ng-components/meteo-dwd-button/meteo-dwd-button.component';
import {MeteoDwdContainerComponent} from './ng-components/meteo-dwd-container/meteo-dwd-container.component';
import {MeteoDwdStateModule} from '../state/meteo-dwd-state.module';
import {MeteoDwdTimelineComponent} from './ng-components/meteo-dwd-timeline/meteo-dwd-timeline.component';
import {MeteoDwdRestModule} from '../rest/meteo-dwd-rest.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule,
        MeteoDwdDomainModule,
        MeteoDwdRestModule,
        MeteoDwdStateModule,
        MatButtonToggleModule,
        MatSliderModule,
        MatMenuModule,
        MatSelectModule,
        MatInputModule,
    ],
    declarations: [
        MeteoDwdButtonComponent,
        MeteoDwdContainerComponent,
        MeteoDwdTimelineComponent
    ],
    exports: [
        MeteoDwdButtonComponent,
        MeteoDwdContainerComponent,
        MeteoDwdTimelineComponent
    ],
    providers: [
    ]
})
export class MeteoDwdViewModule {
}
