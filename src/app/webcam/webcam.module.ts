import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {RestWebcamService} from './rest-service/rest-webcam.service';
import {WebcamService} from './domain-service/webcam.service';
import {EffectsModule} from '@ngrx/effects';
import {WebcamEffects} from './ngrx/webcam.effects';
import {StoreModule} from '@ngrx/store';
import {webcamReducer} from './ngrx/webcam.reducer';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('webcamState', webcamReducer),
        EffectsModule.forFeature([WebcamEffects]),
        SharedModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        WebcamService,
        RestWebcamService
    ]
})
export class WebcamModule {}
