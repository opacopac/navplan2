import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
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
