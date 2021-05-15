import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {RestWebcamService} from './rest-service/rest-webcam.service';
import {WebcamService} from './domain-service/webcam.service';


@NgModule({
    imports: [
        CommonModule,
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
