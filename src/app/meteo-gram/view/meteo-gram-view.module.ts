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
import {MeteogramComponent} from './ng-components/meteogram/meteogram.component';
import {MeteoDwdStateModule} from '../../meteo-dwd/state/meteo-dwd-state.module';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule,
        MeteoGramDomainModule,
        MeteoGramRestModule,
        MeteoDwdStateModule,
        MatButtonToggleModule,
        MatSliderModule,
        MatMenuModule,
        MatSelectModule,
        MatInputModule,
    ],
    declarations: [
        MeteogramComponent
    ],
    exports: [
        MeteogramComponent
    ],
    providers: [
    ]
})
export class MeteoGramViewModule {
}
