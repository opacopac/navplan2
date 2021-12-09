import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../common/shared.module';
import {meteoSmaReducer} from './ngrx/meteo-sma.reducer';
import {MeteoSmaEffects} from './ngrx/meteo-sma.effects';
import {MeteoSmaContainerComponent} from './ng-components/meteo-sma-container/meteo-sma-container.component';
import {MeteoSmaButtonComponent} from './ng-components/meteo-sma-button/meteo-sma-button.component';
import {MeteoSmaModule} from '../meteo-sma/meteo-sma.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('meteoSmaState', meteoSmaReducer),
        EffectsModule.forFeature([MeteoSmaEffects]),
        MeteoSmaModule
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
export class FlightMapMeteoSmaModule {
}
