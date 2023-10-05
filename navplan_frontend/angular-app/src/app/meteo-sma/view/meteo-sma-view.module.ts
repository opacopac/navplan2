import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MeteoSmaDomainModule} from '../domain/meteo-sma-domain.module';
import {MeteoSmaRestModule} from '../rest/meteo-sma-rest.module';
import {MeteoSmaStateModule} from '../state/meteo-sma-state.module';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule,
        MeteoSmaDomainModule,
        MeteoSmaRestModule,
        MeteoSmaStateModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class MeteoSmaViewModule {
}
