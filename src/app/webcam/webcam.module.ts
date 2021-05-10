import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {WebcamService} from './rest-service/webcam.service';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {WebcamEffects} from './ngrx/webcam-effects';
import {WebcamState} from './ngrx/webcam-state';
import {WebcamActions} from './ngrx/webcam-actions';
import {webcamReducer} from './ngrx/webcam-reducer';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<WebcamState, WebcamActions>('webcamState', webcamReducer),
        EffectsModule.forFeature([WebcamEffects]),
        SharedModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        WebcamService
    ]
})
export class WebcamModule {}
