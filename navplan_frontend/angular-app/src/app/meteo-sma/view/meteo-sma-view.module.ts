import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MeteoSmaDomainModule} from '../domain/meteo-sma-domain.module';
import {MeteoSmaRestModule} from '../rest/meteo-sma-rest.module';
import {MeteoSmaStateModule} from '../state/meteo-sma-state.module';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';


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
