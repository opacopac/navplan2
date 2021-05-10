import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {WebcamService} from './rest-service/webcam.service';
import {EffectsModule} from '@ngrx/effects';
import {WebcamEffects} from './ngrx/webcam-effects';


@NgModule({
    imports: [
        CommonModule,
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
