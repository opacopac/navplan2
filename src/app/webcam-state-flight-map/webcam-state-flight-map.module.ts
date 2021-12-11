import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {webcamReducer} from './ngrx/webcam.reducer';
import {WebcamEffects} from './ngrx/webcam.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('webcamState', webcamReducer),
        EffectsModule.forFeature([WebcamEffects]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class WebcamStateFlightMapModule {}
