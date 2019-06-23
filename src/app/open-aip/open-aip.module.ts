import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OpenAipService} from './services/open-aip.service';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {openAipReducer} from './ngrx/open-aip.reducer';
import {EffectsModule} from '@ngrx/effects';
import {OpenAipEffects} from './ngrx/open-aip-effects.service';
import {OpenAipActions} from './ngrx/open-aip.actions';
import {OpenAipState} from './domain/open-aip-state';
import {OlMapModule} from '../ol-map/ol-map.module';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<OpenAipState, OpenAipActions>('openAipState', openAipReducer),
        EffectsModule.forFeature([OpenAipEffects]),
        SharedModule,
        OlMapModule,
    ],
    declarations: [

    ],
    providers: [
        OpenAipService
    ]
})
export class OpenAipModule {}
