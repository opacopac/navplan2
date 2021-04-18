import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OpenAipRepo} from './rest-service/open-aip-repo.service';
import {SharedModule} from '../common/shared.module';
import {StoreModule} from '@ngrx/store';
import {openAipReducer} from './ngrx/open-aip.reducer';
import {EffectsModule} from '@ngrx/effects';
import {OpenAipEffects} from './ngrx/open-aip.effects';
import {OpenAipActions} from './ngrx/open-aip.actions';
import {OpenAipState} from './domain-model/open-aip-state';
import {BaseMapModule} from '../base-map/base-map.module';
import {OpenAipService} from './domain-service/open-aip-service2.service';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<OpenAipState, OpenAipActions>('openAipState', openAipReducer),
        EffectsModule.forFeature([OpenAipEffects]),
        SharedModule,
        BaseMapModule,
    ],
    declarations: [

    ],
    providers: [
        OpenAipRepo,
        OpenAipService
    ]
})
export class OpenAipModule {}
