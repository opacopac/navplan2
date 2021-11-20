import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {BaseMapModule} from '../base-map/base-map.module';
import {MeteoSmaButtonComponent} from './ng-components/meteo-sma-button/meteo-sma-button.component';
import {StoreModule} from '@ngrx/store';
import {meteoSmaReducer} from './ngrx/meteo-sma.reducer';
import {EffectsModule} from '@ngrx/effects';
import {MeteoSmaEffects} from './ngrx/meteo-sma.effects';
import {MeteoSmaContainerComponent} from './ng-components/meteo-sma-container/meteo-sma-container.component';
import {IMeteoSmaRepoService} from './domain-service/i-meteo-sma-repo.service';
import {RestMeteoSmaService} from './rest-service/rest-meteo-sma.service';
import {IMeteoSmaService} from './domain-service/i-meteo-sma.service';
import {MeteoSmaService} from './domain-service/meteo-sma.service';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('meteoSmaState', meteoSmaReducer),
        EffectsModule.forFeature([MeteoSmaEffects]),
        SharedModule,
        BaseMapModule,
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
        { provide: IMeteoSmaService, useClass: MeteoSmaService },
        { provide: IMeteoSmaRepoService, useClass: RestMeteoSmaService },
    ]
})
export class MeteoSmaModule {
}
