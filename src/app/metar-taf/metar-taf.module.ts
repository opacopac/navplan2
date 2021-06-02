import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestMetarTafService} from './rest-service/rest-metar-taf.service';
import {SharedModule} from '../common/shared.module';
import {BaseMapModule} from '../base-map/base-map.module';
import {MetarTafService} from './domain-service/metar-taf.service';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {metarTafReducer} from './ngrx/metar-taf.reducer';
import {MetarTafEffects} from './ngrx/metar-taf.effects';
import {IMetarTafService} from './domain-service/i-metar-taf.service';
import {IMetarTafRepo} from './domain-service/i-metar-taf-repo.service';
import {IMetarTafStateProvider} from './domain-service/i-metar-taf-state-provider';
import {NgrxMetarTafStateProvider} from './ngrx/ngrx-metar-taf-state-provider';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('metarTafState', metarTafReducer),
        EffectsModule.forFeature([MetarTafEffects]),
        SharedModule,
        BaseMapModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IMetarTafStateProvider, useClass: NgrxMetarTafStateProvider },
        { provide: IMetarTafService, useClass: MetarTafService },
        { provide: IMetarTafRepo, useClass: RestMetarTafService },
    ]
})
export class MetarTafModule {
}
