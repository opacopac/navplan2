import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MeteoSmaContainerComponent} from './ng-components/meteo-sma-container/meteo-sma-container.component';
import {MeteoSmaButtonComponent} from './ng-components/meteo-sma-button/meteo-sma-button.component';
import {MeteoSmaModule} from '../meteo-sma/meteo-sma.module';
import {MeteoSmaRestModule} from '../meteo-sma-rest/meteo-sma-rest.module';
import {MeteoSmaStateModule} from '../meteo-sma-state/meteo-sma-state.module';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule,
        MeteoSmaModule,
        MeteoSmaRestModule,
        MeteoSmaStateModule,
    ],
    declarations: [
        MeteoSmaButtonComponent,
        MeteoSmaContainerComponent
    ],
    exports: [
        MeteoSmaButtonComponent,
        MeteoSmaContainerComponent
    ],
    providers: [
    ]
})
export class MeteoSmaViewModule {
}
