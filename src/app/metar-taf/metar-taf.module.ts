import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestMetarTafService} from './rest-service/rest-metar-taf.service';
import {SharedModule} from '../common/shared.module';
import {IMetarTafRepo} from './domain-service/i-metar-taf-repo.service';
import {StoreModule} from '@ngrx/store';
import {metarTafReducer} from './ngrx/metar-taf.reducer';
import {EffectsModule} from '@ngrx/effects';
import {MetarTafEffects} from './ngrx/metar-taf.effects';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('metarTafState', metarTafReducer),
        EffectsModule.forFeature([MetarTafEffects]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IMetarTafRepo, useClass: RestMetarTafService },
    ]
})
export class MetarTafModule {
}
