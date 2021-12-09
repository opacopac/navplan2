import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {webcamReducer} from './ngrx/webcam.reducer';
import {WebcamEffects} from './ngrx/webcam.effects';
import {WebcamModule} from '../webcam/webcam.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('webcamState', webcamReducer),
        EffectsModule.forFeature([WebcamEffects]),
        WebcamModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class FlightMapWebcamModule {}
