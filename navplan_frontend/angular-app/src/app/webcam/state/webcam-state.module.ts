import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {webcamReducer} from './ngrx/webcam.reducer';
import {WebcamEffects} from './ngrx/webcam.effects';
import {WebcamDomainModule} from '../domain/webcam-domain.module';
import {WebcamRestModule} from '../rest/webcam-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('webcamState', webcamReducer),
        EffectsModule.forFeature([WebcamEffects]),
        WebcamDomainModule,
        WebcamRestModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class WebcamStateModule {
}
