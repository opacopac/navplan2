import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatLegacySliderModule as MatSliderModule} from '@angular/material/legacy-slider';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MeteoGramRestModule} from '../rest/meteo-gram-rest.module';
import {MeteoGramDomainModule} from '../domain/meteo-gram-domain.module';
import {PrecipTempGraphComponent} from './ng-components/precip_temp_graph/precip-temp-graph.component';
import {MeteoGramStateModule} from '../state/meteo-gram-state.module';
import {MeteogramComponent} from './ng-components/meteogram/meteogram.component';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule,
        MeteoGramDomainModule,
        MeteoGramRestModule,
        MeteoGramStateModule,
        MatButtonToggleModule,
        MatSliderModule,
        MatMenuModule,
        MatSelectModule,
        MatInputModule,
    ],
    declarations: [
        MeteogramComponent,
        PrecipTempGraphComponent
    ],
    exports: [
        MeteogramComponent,
        PrecipTempGraphComponent
    ],
    providers: [
    ]
})
export class MeteoGramViewModule {
}
