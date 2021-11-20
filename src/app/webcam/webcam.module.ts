import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {WebcamRestService} from './rest-service/webcam-rest.service';
import {IWebcamRepo} from './domain-service/i-webcam-repo';
import {StoreModule} from '@ngrx/store';
import {webcamReducer} from './ngrx/webcam.reducer';
import {EffectsModule} from '@ngrx/effects';
import {WebcamEffects} from './ngrx/webcam.effects';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('webcamState', webcamReducer),
        EffectsModule.forFeature([WebcamEffects]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IWebcamRepo, useClass: WebcamRestService }
    ]
})
export class WebcamModule {}
