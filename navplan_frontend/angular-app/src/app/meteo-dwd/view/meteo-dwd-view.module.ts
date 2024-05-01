import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {MeteoDwdDomainModule} from '../domain/meteo-dwd-domain.module';
import {MeteoButtonComponent} from '../../flight-map/view/ng-components/meteo-button/meteo-button.component';
import {MeteoDwdStateModule} from '../state/meteo-dwd-state.module';
import {MeteoDwdTimelineComponent} from './ng-components/meteo-dwd-timeline/meteo-dwd-timeline.component';
import {MeteoDwdRestModule} from '../rest/meteo-dwd-rest.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatLegacySliderModule as MatSliderModule} from '@angular/material/legacy-slider';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';


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
        MeteoButtonComponent,
        MeteoDwdTimelineComponent,
    ],
    exports: [
        MeteoButtonComponent,
        MeteoDwdTimelineComponent,
    ],
    providers: [
    ]
})
export class MeteoDwdViewModule {
}
