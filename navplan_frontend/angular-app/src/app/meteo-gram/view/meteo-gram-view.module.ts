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
import {
    MapPopupPrecipTempGraphComponent
} from './ng-components/map-popup-precip-temp-graph/map-popup-precip-temp-graph.component';
import {MeteoGramStateModule} from '../state/meteo-gram-state.module';
import {MapPopupMeteogramComponent} from './ng-components/map-popup-meteogram/map-popup-meteogram.component';


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
        MapPopupMeteogramComponent,
        MapPopupPrecipTempGraphComponent
    ],
    exports: [
        MapPopupMeteogramComponent,
        MapPopupPrecipTempGraphComponent
    ],
    providers: [
    ]
})
export class MeteoGramViewModule {
}
